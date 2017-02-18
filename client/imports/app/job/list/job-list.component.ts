import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { PaginationService } from 'ng2-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { InjectUser } from "angular2-meteor-accounts-ui";

import 'rxjs/add/operator/combineLatest';


import template from './job-list.component.html';
import style from './job-list.component.scss';
import {Job} from "../../../../../both/models/job.model";
import {JobCollection} from "../../../../../both/collections/job.collection";

interface Pagination {
  limit: number;
  skip: number;
}

interface Options extends Pagination {
  [key: string]: any
}

@Component({
  selector: 'job-list',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class JobListComponent implements OnInit, OnDestroy {
  job: Observable<Job[]>;
  jobSub: Subscription;
  pageSize: Subject<number> = new Subject<number>();
  curPage: Subject<number> = new Subject<number>();
  nameOrder: Subject<number> = new Subject<number>();
  optionsSub: Subscription;
  jobSize: number = 0;
  autorunSub: Subscription;
  location: Subject<string> = new Subject<string>();
  user: Meteor.User;

  constructor(
    private paginationService: PaginationService
  ) {}

  ngOnInit() {

    this.optionsSub = Observable.combineLatest(
      this.pageSize,
      this.curPage,
      this.nameOrder,
      this.location
    ).subscribe(([pageSize, curPage, nameOrder, location]) => {
      const options: Options = {
        limit: pageSize as number,
        skip: ((curPage as number) - 1) * (pageSize as number),
        sort: { name: nameOrder as number }
      };

      this.paginationService.setCurrentPage(this.paginationService.defaultId(), curPage as number);

      if (this.jobSub) {
        this.jobSub.unsubscribe();
      }

      this.jobSub = MeteorObservable.subscribe('job', options, location).subscribe(() => {
        this.job = JobCollection.find({}, {
          sort: {
            name: nameOrder
          }
        }).zone();
      });
    });

    this.paginationService.register({
      id: this.paginationService.defaultId(),
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.jobSize
    });

    this.pageSize.next(10);
    this.curPage.next(1);
    this.nameOrder.next(1);
    this.location.next('');

    this.autorunSub = MeteorObservable.autorun().subscribe(() => {
      this.jobSize = Counts.get('numberOfJobs');
      this.paginationService.setTotalItems(this.paginationService.defaultId(), this.jobSize);
    });
  }

  removeJob(job: Job): void {
    JobCollection.remove(job._id);
  }

  search(value: string): void {
    this.curPage.next(1);
    this.location.next(value);
  }

  onPageChanged(page: number): void {
    this.curPage.next(page);
  }

  changeSortOrder(nameOrder: string): void {
    this.nameOrder.next(parseInt(nameOrder));
  }

  isOwner(job: Job): boolean {
    return this.user && this.user._id === job.owner;
  }

  ngOnDestroy() {
    this.jobSub.unsubscribe();
    this.optionsSub.unsubscribe();
    this.autorunSub.unsubscribe();
  }
}
