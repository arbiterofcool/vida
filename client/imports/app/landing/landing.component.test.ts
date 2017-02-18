// chai uses as asset library
import {assert} from "chai";

// Angular 2 tests imports
import {TestBed, TestModuleMetadata} from "@angular/core/testing";

// Project imports
import {Observable, BehaviorSubject} from "rxjs";
import {LandingComponent} from "./landing.component";

describe("LandingComponent", () => {
  let landingComponentInstance: LandingComponent;
  let landingComponentElement;
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
      declarations: [LandingComponent],
      providers: [
        {provide: JobDataService, useValue: mockDataService}
      ]
    });

    componentFixture = TestBed.createComponent(LandingComponent);
    landingComponentInstance = componentFixture.componentInstance;
    landingComponentElement = componentFixture.debugElement;
  });

  describe("@Component instance", () => {
    it("Should have a greeting string on the component", () => {
      assert.typeOf(landingComponentInstance.greeting, "string", "Greeting should be a string!");
    });

    it("Should say hello to the component on the greeting string", () => {
      assert.equal(landingComponentInstance.greeting, "Hello Landing Component!");
    });

    it("Should have an Observable (from the mock) of the instance", () => {
      landingComponentInstance.ngOnInit();
      assert.isTrue(landingComponentInstance.data instanceof Observable);
    });

    it("Should have an items in the Observable", (done) => {
      landingComponentInstance.ngOnInit();
      assert.isTrue(landingComponentInstance.data instanceof Observable);

      landingComponentInstance.data.subscribe((data) => {
        assert.equal(data.length, 1);
        assert.typeOf(data, "array");

        done();
      });
    });
  });

  describe("@Component view", () => {
    it("Should print the greeting to the screen", () => {
      componentFixture.detectChanges();
      assert.include(landingComponentElement.nativeElement.innerHTML, "Hello Landing Component");
    });

    it("Should change the greeting when it changes", () => {
      componentFixture.detectChanges();
      assert.include(landingComponentElement.nativeElement.innerHTML, "Hello Landing Component");
      landingComponentInstance.greeting = "New Test Greeting";
      componentFixture.detectChanges();
      assert.include(landingComponentElement.nativeElement.innerHTML, "New Test Greeting");
    });

    it("Should display a list of items in the screen", () => {
      componentFixture.detectChanges();
      assert.isNotNull(landingComponentElement.nativeElement.querySelector("ul"));
    });
  });
});
