import { Route } from '@angular/router';
import {JobListComponent} from "./job/list/job-list.component";
import {JobDetailsComponent} from "./job/detail/job-details.component";
import {Meteor} from 'meteor/meteor';
import {SignupComponent} from "./auth/signup.component";
import {RecoverComponent} from "./auth/recover.component";
import {MobileLoginComponent} from "./auth/login.component.mobile";
import {LoginComponent} from "./auth/login.component.web";
import {LandingComponent} from "./landing/landing.component";


export const routes: Route[] = [
  { path: '', component: LandingComponent },
  // { path: '', component: JobListComponent },
  { path: 'job/:jobId', component: JobDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'login', component: Meteor.isCordova ? MobileLoginComponent : LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover', component: RecoverComponent }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];