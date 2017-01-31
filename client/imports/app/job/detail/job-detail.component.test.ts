// chai uses as asset library
import {assert} from "chai";

// Angular 2 tests imports
import {TestBed, TestModuleMetadata} from "@angular/core/testing";

// Project imports
import {JobDetailComponent} from "./job-detail.component";
import {Job} from "../../../../../both/models/job.model";
import {JobDataService} from "../service/job-data.service";
import {Observable, BehaviorSubject} from "rxjs";

describe("JobDetailComponent", () => {
  let jobDetailComponentInstance: JobDetailComponent;
  let jobDetailComponentElement;
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
      declarations: [JobDetailComponent],
      providers: [
        {provide: JobDataService, useValue: mockDataService}
      ]
    });

    componentFixture = TestBed.createComponent(JobDetailComponent);
    jobDetailComponentInstance = componentFixture.componentInstance;
    jobDetailComponentElement = componentFixture.debugElement;
  });

  describe("@Component instance", () => {
    it("Should have a greeting string on the component", () => {
      assert.typeOf(jobDetailComponentInstance.greeting, "string", "Greeting should be a string!");
    });

    it("Should say hello to the component on the greeting string", () => {
      assert.equal(jobDetailComponentInstance.greeting, "Hello JobDetail Component!");
    });

    it("Should have an Observable (from the mock) of the instance", () => {
      jobDetailComponentInstance.ngOnInit();
      assert.isTrue(jobDetailComponentInstance.data instanceof Observable);
    });

    it("Should have an items in the Observable", (done) => {
      jobDetailComponentInstance.ngOnInit();
      assert.isTrue(jobDetailComponentInstance.data instanceof Observable);

      jobDetailComponentInstance.data.subscribe((data) => {
        assert.equal(data.length, 1);
        assert.typeOf(data, "array");

        done();
      });
    });
  });

  describe("@Component view", () => {
    it("Should print the greeting to the screen", () => {
      componentFixture.detectChanges();
      assert.include(jobDetailComponentElement.nativeElement.innerHTML, "Hello JobDetail Component");
    });

    it("Should change the greeting when it changes", () => {
      componentFixture.detectChanges();
      assert.include(jobDetailComponentElement.nativeElement.innerHTML, "Hello JobDetail Component");
      jobDetailComponentInstance.greeting = "New Test Greeting";
      componentFixture.detectChanges();
      assert.include(jobDetailComponentElement.nativeElement.innerHTML, "New Test Greeting");
    });

    it("Should display a detail of items in the screen", () => {
      componentFixture.detectChanges();
      assert.isNotNull(jobDetailComponentElement.nativeElement.querySelector("ul"));
    });
  });
});
