import { Route } from '@angular/router';
import {JobListComponent} from "./job/list/job-list.component";
import {JobDetailComponent} from "./job/detail/job-detail.component";
import {Meteor} from 'meteor/meteor';


export const routes: Route[] = [
  { path: '', component: JobListComponent },
  { path: 'job:jobId', component: JobDetailComponent, canActivate: ['canActivateForLoggedIn'] }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];