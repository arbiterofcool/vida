// chai uses as asset library
import { assert } from "chai";

// Project imports
import { JobDataService } from "./job-data.service";
import { Observable } from "rxjs";

describe("JobDataService", () => {
  let jobDataService: JobDataService;

  beforeEach(() => {
    // Create the service instance
    jobDataService = new JobDataService();
  });

  it("Should return Observable when requesting the data", () => {
    assert.isTrue(jobDataService.getData() instanceof Observable);
  });
});
