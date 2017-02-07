import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";
import { MouseEvent } from "angular2-google-maps/core";

import 'rxjs/add/operator/map';


import template from './job-details.component.html';
import style from './job-details.component.scss';
import {Job} from "../../../../../both/models/job.model";
import {User} from "../../../../../both/models/user.model";
import {JobCollection} from "../../../../../both/collections/job.collection";
import {Users} from "../../../../../both/collections/users.collection";

@Component({
  selector: 'job-details',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class JobDetailsComponent implements OnInit, OnDestroy {
  jobId: string;
  paramsSub: Subscription;
  job: Job;
  jobSub: Subscription;
  users: Observable<User>;
  uninvitedSub: Subscription;
  user: Meteor.User;
  // Default center Palo Alto coordinates.
  centerLat: number = 37.4292;
  centerLng: number = -122.1381;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['jobId'])
      .subscribe(jobId => {
        this.jobId = jobId;

        if (this.jobSub) {
          this.jobSub.unsubscribe();
        }

        this.jobSub = MeteorObservable.subscribe('job', this.jobId).subscribe(() => {
          MeteorObservable.autorun().subscribe(() => {
            this.job = JobCollection.findOne(this.jobId);
            this.getUsers(this.job);
          });
        });

        if (this.uninvitedSub) {
          this.uninvitedSub.unsubscribe();
        }

        this.uninvitedSub = MeteorObservable.subscribe('uninvited', this.jobId).subscribe(() => {
          this.getUsers(this.job);
        });
      });
  }

  getUsers(job: Job) {
    if (job) {
      this.users = Users.find({
        _id: {
          $nin: job.invited || [],
          $ne: Meteor.userId()
        }
      }).zone();
    }
  }

  saveJob() {
    if (!Meteor.userId()) {
      alert('Please log in to change this job');
      return;
    }

    JobCollection.update(this.job._id, {
      $set: {
        name: this.job.name,
        description: this.job.description,
        location: this.job.location,
        open: this.job.open
      }
    });
  }

  invite(user: Meteor.User) {
    MeteorObservable.call('invite', this.job._id, user._id).subscribe(() => {
      alert('User successfully invited.');
    }, (error) => {
      alert(`Failed to invite due to ${error}`);
    });
  }

  reply(rsvp: string) {
    MeteorObservable.call('reply', this.job._id, rsvp).subscribe(() => {
      alert('You successfully replied.');
    }, (error) => {
      alert(`Failed to reply due to ${error}`);
    });
  }

  get isOwner(): boolean {
    return this.job && this.user && this.user._id === this.job.owner;
  }

  get isOpen(): boolean {
    return this.job && this.job.open;
  }

  get isInvited(): boolean {
    if (this.job && this.user) {
      const invited = this.job.invited || [];

      return invited.indexOf(this.user._id) !== -1;
    }

    return false;
  }


  get lat(): number {
    return this.job && this.job.location.lat;
  }

  get lng(): number {
    return this.job && this.job.location.lng;
  }

  mapClicked($event: MouseEvent) {
    this.job.location.lat = $event.coords.lat;
    this.job.location.lng = $event.coords.lng;
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.jobSub.unsubscribe();
    this.uninvitedSub.unsubscribe();
  }
}
