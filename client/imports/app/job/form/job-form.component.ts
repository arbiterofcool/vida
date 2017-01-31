import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { JobDataService } from "../service/job-data.service";
import template from "./job-form.component.html";
import style from "./job-form.component.scss";
import {Job} from "../../../../../both/models/job.model";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {JobCollection} from "../../../../../both/collections/job.collection";
import { Meteor } from 'meteor/meteor';
import {InjectUser} from "angular2-meteor-accounts-ui";



@Component({
  selector: "job-form",
  template,
  styles: [ style ]
})
@InjectUser('user')
export class JobFormComponent implements OnInit {
  user: Meteor.User;
  addForm: FormGroup;
  
  data: Observable<Job[]>;

  constructor(private formBuilder: FormBuilder) {
    console.log("job-form.component", "constructor");
  }

  ngOnInit() {
    console.log("job-form.component", "ngOnInit");
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [],
      location: ['', Validators.required]
    });
  }

  addJob(): void {
    console.log("job-form.component", "addJob");
    if (!Meteor.userId()) {
      alert('Please log in to add a Job');
      return;
    }
    if (this.addForm.valid) {
      JobCollection.insert(Object.assign({}, this.addForm.value, { owner: Meteor.userId() }));

      this.addForm.reset();
    }
  }
}
