import { Injectable } from "@angular/core";
import { ObservableCursor } from "meteor-rxjs";
import {JobCollection} from "../../../../../both/collections/job.collection";
import {Job} from "../../../../../both/models/job.model";

@Injectable()
export class JobDataService {
  private data: ObservableCursor<Job>;

  constructor() {
    console.log("job-data.service", "constructor");
    this.data = JobCollection.find({});
  }

  public getData(): ObservableCursor<Job> {
    console.log("job-data.service", "getData");
    return this.data;
  }
}
