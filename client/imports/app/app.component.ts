import { Component } from "@angular/core";
import template from "./app.component.html";
import style from "./app.component.scss";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app",
  template,
  styles: [ style ]
})
export class AppComponent {
  jobs:Observable<any[]>;
  
  constructor() {
    // this.jobs = Jobs.find({}).zone();
  }
  
}
