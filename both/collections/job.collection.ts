import { MongoObservable } from "meteor-rxjs";
import { Meteor } from 'meteor/meteor';
import {Job} from "../models/job.model";

export const JobCollection = new MongoObservable.Collection<Job>("job-collection");

function loggedIn() {
  console.log("job.collection", "loggedIn");
  return !!Meteor.user();
}

JobCollection.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
})