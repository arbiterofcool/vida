import {JobListComponent} from "./list/job-list.component";
import {JobDataService} from "./service/job-data.service";
import {JobDetailComponent} from "./detail/job-detail.component";
import {JobFormComponent} from "./form/job-form.component";

export const JOB_COMPONENT_DECLARATIONS = [
  JobDetailComponent,
  JobFormComponent,
  JobListComponent
];

export const JOB_SERVICE_DECLARATIONS = [
  JobDataService
];