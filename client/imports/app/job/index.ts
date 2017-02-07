import {JobListComponent} from "./list/job-list.component";
import {JobDataService} from "./service/job-data.service";
import {JobDetailsComponent} from "./detail/job-details.component";
import {JobFormComponent} from "./form/job-form.component";

export const JOB_COMPONENT_DECLARATIONS = [
  JobDetailsComponent,
  JobFormComponent,
  JobListComponent
];

export const JOB_SERVICE_DECLARATIONS = [
  JobDataService
];