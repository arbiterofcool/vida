import {Pipe, PipeTransform} from '@angular/core';
import {Job} from "../../../../both/models/job.model";
import {JobCollection} from "../../../../both/collections/job.collection";

@Pipe({
  name: 'rsvp'
})
export class RsvpPip implements PipeTransform {
  transform(job: Job, type: string): number {
    if (!type) {
      return 0;
    }

    let total = 0;
    const found = JobCollection.findOne(job._id);

    if (found) {
      total = found.rsvps ? found.rsvps.filter(rsvp => rsvp.response === type).length : 0;
    }

    return total;
  }
}