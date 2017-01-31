// chai uses as asset library
import {assert} from "chai";

// Angular 2 tests imports
import {TestBed, TestModuleMetadata} from "@angular/core/testing";

// Project imports
import {JobListComponent} from "./job-list.component";
import {Job} from "../../../../../both/models/job.model";
import {JobDataService} from "../service/job-data.service";
import {Observable, BehaviorSubject} from "rxjs";

describe("JobListComponent", () => {
  let jobListComponentInstance: JobListComponent;
  let jobListComponentElement;
  let componentFixture;

  let mockData = new BehaviorSubject([]);
  mockData.next([
    <Job>{
      name: "Test",
      description: "10"
    }
  ]);

  let mockDataService = {
    getData: () => mockData
  };

  beforeEach(() => {
    TestBed.configureTestingModule(<TestModuleMetadata>{
      declarations: [JobListComponent],
      providers: [
        {provide: JobDataService, useValue: mockDataService}
      ]
    });

    componentFixture = TestBed.createComponent(JobListComponent);
    jobListComponentInstance = componentFixture.componentInstance;
    jobListComponentElement = componentFixture.debugElement;
  });

  describe("@Component instance", () => {
    it("Should have a greeting string on the component", () => {
      assert.typeOf(jobListComponentInstance.greeting, "string", "Greeting should be a string!");
    });

    it("Should say hello to the component on the greeting string", () => {
      assert.equal(jobListComponentInstance.greeting, "Hello JobList Component!");
    });

    it("Should have an Observable (from the mock) of the instance", () => {
      jobListComponentInstance.ngOnInit();
      assert.isTrue(jobListComponentInstance.data instanceof Observable);
    });

    it("Should have an items in the Observable", (done) => {
      jobListComponentInstance.ngOnInit();
      assert.isTrue(jobListComponentInstance.data instanceof Observable);

      jobListComponentInstance.data.subscribe((data) => {
        assert.equal(data.length, 1);
        assert.typeOf(data, "array");

        done();
      });
    });
  });

  describe("@Component view", () => {
    it("Should print the greeting to the screen", () => {
      componentFixture.detectChanges();
      assert.include(jobListComponentElement.nativeElement.innerHTML, "Hello JobList Component");
    });

    it("Should change the greeting when it changes", () => {
      componentFixture.detectChanges();
      assert.include(jobListComponentElement.nativeElement.innerHTML, "Hello JobList Component");
      jobListComponentInstance.greeting = "New Test Greeting";
      componentFixture.detectChanges();
      assert.include(jobListComponentElement.nativeElement.innerHTML, "New Test Greeting");
    });

    it("Should display a list of items in the screen", () => {
      componentFixture.detectChanges();
      assert.isNotNull(jobListComponentElement.nativeElement.querySelector("ul"));
    });
  });
});
