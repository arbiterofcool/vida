import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { PaginationService } from 'ng2-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { InjectUser } from "angular2-meteor-accounts-ui";

import 'rxjs/add/operator/combineLatest';


import template from './landing.component.html';
import style from './landing.component.scss';
// import {Job} from "../../../../../both/models/job.model";
// import {JobCollection} from "../../../../../both/collections/job.collection";

// interface Pagination {
//   limit: number;
//   skip: number;
// }

// interface Options extends Pagination {
//   [key: string]: any
// }

@Component({
  selector: 'landing-page',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class LandingComponent implements OnInit, OnDestroy {


  constructor(
    private paginationService: PaginationService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
