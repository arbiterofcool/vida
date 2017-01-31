import {JobCollection} from "../../../both/collections/job.collection";
import {Job} from "../../../both/models/job.model";
import '../publications/job.publication';


export class Main {
  start(): void {
    this.initFakeData();
  }

  initFakeData(): void {
    if (JobCollection.find({}).cursor.count() === 0) {
      for (var i = 0; i < 27; i++) {
        JobCollection.insert({
          name: Fake.sentence(50),
          location: Fake.sentence(10),
          description: Fake.sentence(100)
        });
      }
    }

  }
}
