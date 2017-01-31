import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import template from "./job-detail.component.html";
import style from "./job-detail.component.scss";
import {Job} from "../../../../../both/models/job.model";
import 'rxjs/add/operator/map';
import {JobCollection} from "../../../../../both/collections/job.collection";



@Component({
  selector: "job-detail",
  template,
  styles: [ style ]
})
export class JobDetailComponent implements OnInit, OnDestroy {
  jobId: string;
  paramsSub: Subscription;
  job: Job;

  constructor(private route: ActivatedRoute) {
    console.log("job-detail.component", "constructor");
  }

  ngOnInit() {
    console.log("job-detail.component", "ngOnInit");
    this.paramsSub = this.route.params
      .map(params => params['jobId'])
      .subscribe(jobId => {
        this.jobId = jobId

        this.job = JobCollection.findOne(this.jobId);
      });
  }

  saveJob() {
    console.log("job-detail.component", "saveJob");
    JobCollection.update(this.job._id, {
      $set: {
        name: this.job.name,
        description: this.job.description,
        location: this.job.location
      }
    });
  }

  ngOnDestroy() {
    console.log("job-detail.component", "ngOnDestroy");
    this.paramsSub.unsubscribe();
  }
}
