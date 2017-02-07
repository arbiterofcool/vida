import {JobCollection} from '../collections/job.collection';
import {Email} from 'meteor/email';
import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';

function getContactEmail(user:Meteor.User):string {
  if (user.emails && user.emails.length)
    return user.emails[0].address;

  return null;
}

Meteor.methods({
  invite: function (jobId:string, userId:string) {
    check(jobId, String);
    check(userId, String);

    let job = JobCollection.collection.findOne(jobId);

    if (!job)
      throw new Meteor.Error('404', 'No such job!');

    // if (job.open)
    //   throw new Meteor.Error('400', 'That job is public. No need to invite people.');
    //
    // if (job.owner !== this.userId)
    //   throw new Meteor.Error('403', 'No permissions!');

    if (userId !== job.owner && (job.invited || []).indexOf(userId) == -1) {
      JobCollection.collection.update(jobId, {$addToSet: {invited: userId}});

      let from = getContactEmail(Meteor.users.findOne(this.userId));
      let to = getContactEmail(Meteor.users.findOne(userId));

      if (Meteor.isServer && to) {
        Email.send({
          from: 'noreply@socially.com',
          to: to,
          replyTo: from || undefined,
          subject: 'JOB: ' + job.name,
          text: `Hi, I just invited you to ${job.name} on Socially.
                        \n\nCome check it out: ${Meteor.absoluteUrl()}\n`
        });
      }
    }
  },
  reply: function (jobId: string, rsvp: string) {
    check(jobId, String);
    check(rsvp, String);

    if(!this.userId) {
      throw new Meteor.Error('403', 'You must be logged-in to reply');
    }

    if (['yes', 'no', 'maybe'].indexOf(rsvp) === -1) {
      throw new Meteor.Error('400', 'Invalid RSVP');
    }

    let job = JobCollection.findOne({_id: jobId});

    if (!job) {
      throw new Meteor.Error('404', 'No such job');
    }

    if (job.owner === this.userId) {
      throw new Meteor.Error('500', 'You are the owner!');
    }

    let rsvpIndex = job.rsvps ? job.rsvps.findIndex((rsvp) => rsvp.userId === this.userId) : -1;

    if (rsvpIndex !== -1) {
      if (Meteor.isServer) {
        JobCollection.update(
          { _id: jobId, 'rsvps.userId': this.userId },
          { $set: {'rsvps.$.response': rsvp}});
      } else {
        let modifier = {$set: {}};
        modifier.$set['rsvps.' + rsvpIndex + '.response'] = rsvp;

        JobCollection.update(jobId, modifier);
      }
    } else {
      JobCollection.update(jobId,
        { $push: {rsvps: {userId: this.userId, response: rsvp}}});
    }
  }
});