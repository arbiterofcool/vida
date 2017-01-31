// chai uses as asset library
import {assert} from "chai";

// Angular 2 tests imports
import {TestBed, TestModuleMetadata} from "@angular/core/testing";

// Project imports
import {JobFormComponent} from "./job-form.component";
import {Job} from "../../../../../both/models/job.model";
import {JobDataService} from "../service/job-data.service";
import {Observable, BehaviorSubject} from "rxjs";

describe("JobFormComponent", () => {
  let jobFormComponentInstance: JobFormComponent;
  let jobFormComponentElement;
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
      declarations: [JobFormComponent],
      providers: [
        {provide: JobDataService, useValue: mockDataService}
      ]
    });

    componentFixture = TestBed.createComponent(JobFormComponent);
    jobFormComponentInstance = componentFixture.componentInstance;
    jobFormComponentElement = componentFixture.debugElement;
  });

  describe("@Component instance", () => {
    it("Should have a greeting string on the component", () => {
      assert.typeOf(jobFormComponentInstance.greeting, "string", "Greeting should be a string!");
    });

    it("Should say hello to the component on the greeting string", () => {
      assert.equal(jobFormComponentInstance.greeting, "Hello JobForm Component!");
    });

    it("Should have an Observable (from the mock) of the instance", () => {
      jobFormComponentInstance.ngOnInit();
      assert.isTrue(jobFormComponentInstance.data instanceof Observable);
    });

    it("Should have an items in the Observable", (done) => {
      jobFormComponentInstance.ngOnInit();
      assert.isTrue(jobFormComponentInstance.data instanceof Observable);

      jobFormComponentInstance.data.subscribe((data) => {
        assert.equal(data.length, 1);
        assert.typeOf(data, "array");

        done();
      });
    });
  });

  describe("@Component view", () => {
    it("Should print the greeting to the screen", () => {
      componentFixture.detectChanges();
      assert.include(jobFormComponentElement.nativeElement.innerHTML, "Hello JobForm Component");
    });

    it("Should change the greeting when it changes", () => {
      componentFixture.detectChanges();
      assert.include(jobFormComponentElement.nativeElement.innerHTML, "Hello JobForm Component");
      jobFormComponentInstance.greeting = "New Test Greeting";
      componentFixture.detectChanges();
      assert.include(jobFormComponentElement.nativeElement.innerHTML, "New Test Greeting");
    });

    it("Should display a form of items in the screen", () => {
      componentFixture.detectChanges();
      assert.isNotNull(jobFormComponentElement.nativeElement.querySelector("ul"));
    });
  });
});
