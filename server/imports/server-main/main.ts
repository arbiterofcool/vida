import {JobCollection} from "../../../both/collections/job.collection";
import {Job} from "../../../both/models/job.model";
import '../publications/jobs.publication';
import '../publications/users.publication';
import '../../../both/methods/job.methods'


export class Main {
  start(): void {
    this.initFakeData();
  }

  initFakeData(): void {
    if (JobCollection.find({}).cursor.count() === 0) {
      for (var i = 0; i < 27; i++) {
        JobCollection.insert({
          name: Fake.sentence(5),
          location: {name: Fake.sentence(3),
            lat: 37.4292,
            lng: -122.1381},
          description: Fake.sentence(10),
          open: true
        });
      }
    }
    console.log("main", "JobCollection", JobCollection.find({}).cursor.count());
  }
}
