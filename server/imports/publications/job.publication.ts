import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import {JobCollection} from "../../../both/collections/job.collection";


interface Options {
  [key: string]: any;
}

Meteor.publish('jobs', function(options: Options, location?: string) {
  const selector = buildQuery.call(this, null, location);

  Counts.publish(this, 'numberOfJobs', JobCollection.collection.find(selector), { noReady: true });

  return JobCollection.find(selector, options);
});

Meteor.publish('jobs', function(jobId: string) {
  return JobCollection.find(buildQuery.call(this, jobId));
});


function buildQuery(jobId?: string, location?: string): Object {
  const isAvailable = {
    $or: [{
      // job is public
      public: true
    },
      // or
      {
        // current user is the owner
        $and: [{
          owner: this.userId
        }, {
          owner: {
            $exists: true
          }
        }]
      }]
  };

  if (jobId) {
    return {
      // only single job
      $and: [{
        _id: jobId
      },
        isAvailable
      ]
    };
  }

  const searchRegEx = { '$regex': '.*' + (location || '') + '.*', '$options': 'i' };

  return {
    $and: [{
      location: searchRegEx
    },
      isAvailable
    ]
  };
}