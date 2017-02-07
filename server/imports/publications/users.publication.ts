import { Meteor } from 'meteor/meteor';
import {JobCollection} from "../../../both/collections/job.collection";


Meteor.publish('uninvited', function (jobId: string) {
  const job = JobCollection.findOne(jobId);

  if (!job) {
    throw new Meteor.Error('404', 'No such job!');
  }

  return Meteor.users.find({
    _id: {
      $nin: job.invited || [],
      $ne: this.userId
    }
  });
});