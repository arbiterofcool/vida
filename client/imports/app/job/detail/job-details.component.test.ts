// chai uses as asset library
import {assert} from "chai";

// Angular 2 tests imports
import {TestBed, TestModuleMetadata} from "@angular/core/testing";

// Project imports
import {JobDetailsComponent} from "./job-details.component";
import {Job} from "../../../../../both/models/job.model";
import {JobDataService} from "../service/job-data.service";
import {Observable, BehaviorSubject} from "rxjs";

describe("JobDetailsComponent", () => {
  let jobDetailsComponentInstance: JobDetailsComponent;
  let jobDetailsComponentElement;
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
      declarations: [JobDetailsComponent],
      providers: [
        {provide: JobDataService, useValue: mockDataService}
      ]
    });

    componentFixture = TestBed.createComponent(JobDetailsComponent);
    jobDetailsComponentInstance = componentFixture.componentInstance;
    jobDetailsComponentElement = componentFixture.debugElement;
  });

  describe("@Component instance", () => {
    it("Should have a greeting string on the component", () => {
      // assert.typeOf(jobDetailsComponentInstance.greeting, "string", "Greeting should be a string!");
    });

    it("Should say hello to the component on the greeting string", () => {
      // assert.equal(jobDetailsComponentInstance.greeting, "Hello JobDetail Component!");
    });

    it("Should have an Observable (from the mock) of the instance", () => {
      jobDetailsComponentInstance.ngOnInit();
      // assert.isTrue(jobDetailsComponentInstance.data instanceof Observable);
    });

    it("Should have an items in the Observable", (done) => {
      jobDetailsComponentInstance.ngOnInit();
      // assert.isTrue(jobDetailsComponentInstance.data instanceof Observable);

      // jobDetailsComponentInstance.data.subscribe((data) => {
      //   assert.equal(data.length, 1);
      //   assert.typeOf(data, "array");
      //
      //   done();
      // });
    });
  });

  describe("@Component view", () => {
    it("Should print the greeting to the screen", () => {
      componentFixture.detectChanges();
      assert.include(jobDetailsComponentElement.nativeElement.innerHTML, "Hello JobDetail Component");
    });

    it("Should change the greeting when it changes", () => {
      componentFixture.detectChanges();
      assert.include(jobDetailsComponentElement.nativeElement.innerHTML, "Hello JobDetail Component");
      // jobDetailsComponentInstance.greeting = "New Test Greeting";
      componentFixture.detectChanges();
      assert.include(jobDetailsComponentElement.nativeElement.innerHTML, "New Test Greeting");
    });

    it("Should display a detail of items in the screen", () => {
      componentFixture.detectChanges();
      assert.isNotNull(jobDetailsComponentElement.nativeElement.querySelector("ul"));
    });
  });
});
