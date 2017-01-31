// chai uses as asset library
import * as chai from "chai";
import * as spies from "chai-spies";
import StubCollections from "meteor/hwillson:stub-collections";

import { Main } from "./main";
import { JobCollection } from "../../../both/collections/job.collection";

chai.use(spies);

describe("Server Main", () => {
  let mainInstance: Main;

  beforeEach(() => {
    // Creating database mock
    StubCollections.stub(JobCollection);

    // Create instance of main class
    mainInstance = new Main();
  });

  afterEach(() => {
    // Restore database
    StubCollections.restore();
  });

  it("Should call initFakeData on startup", () => {
    mainInstance.initFakeData = chai.spy();
    mainInstance.start();

    chai.expect(mainInstance.initFakeData).to.have.been.called();
  });

  it("Should call insert 3 times when init fake data", () => {
    JobCollection.insert = chai.spy();
    mainInstance.initFakeData();

    chai.expect(JobCollection.insert).to.have.been.called.exactly(3);
  });
});
