import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {routes, ROUTES_PROVIDERS} from './app.routes';
import {JOB_SERVICE_DECLARATIONS, JOB_COMPONENT_DECLARATIONS} from "./job/index";
import {USER_COMPONENT_DECLARATIONS} from "./user/index";
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { Ng2PaginationModule } from 'ng2-pagination';
import {SHARED_DECLARATIONS} from "./shared/index";
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MaterialModule } from '@angular/material'
import {AUTH_DECLARATIONS} from "./auth/index";

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    ...JOB_COMPONENT_DECLARATIONS,
    ...USER_COMPONENT_DECLARATIONS,
    ...SHARED_DECLARATIONS,
    ...AUTH_DECLARATIONS
  ],
  // Entry Components
  entryComponents: [
    AppComponent,
    ...JOB_COMPONENT_DECLARATIONS,
    ...USER_COMPONENT_DECLARATIONS,
    ...AUTH_DECLARATIONS
  ],
  // Providers
  providers: [
    ...JOB_SERVICE_DECLARATIONS,
    ...USER_COMPONENT_DECLARATIONS,
    ...ROUTES_PROVIDERS
  ],
  // Modules
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AccountsModule,
    Ng2PaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAWoBdZHCNh5R-hB5S5ZZ2oeoYyfdDgniA'
    }),
    MaterialModule.forRoot()
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
