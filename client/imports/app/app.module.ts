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


@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    ...JOB_COMPONENT_DECLARATIONS,
    ...USER_COMPONENT_DECLARATIONS
  ],
  // Entry Components
  entryComponents: [
    AppComponent,
    ...JOB_COMPONENT_DECLARATIONS,
    ...USER_COMPONENT_DECLARATIONS
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
    Ng2PaginationModule
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
