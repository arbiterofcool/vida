import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InjectUser } from "angular2-meteor-accounts-ui";
import template from './job-form.component.html';
import style from './job-form.component.scss';
import {JobCollection} from "../../../../../both/collections/job.collection";

@Component({
  selector: 'job-form',
  template,
  styles: [ style ]
})
@InjectUser("user")
export class JobFormComponent implements OnInit {
  addForm: FormGroup;
  newJobPosition: {lat:number, lng: number} = {lat: 37.4292, lng: -122.1381};

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [],
      location: ['', Validators.required],
      open: [false]
    });
  }

  mapClicked($event) {
    this.newJobPosition = $event.coords;
  }

  addJob(): void {
    if (!Meteor.userId()) {
      alert('Please log in to add a job');
      return;
    }

    if (this.addForm.valid) {
      JobCollection.insert({
        name: this.addForm.value.name,
        description: this.addForm.value.description,
        location: {
          name: this.addForm.value.location,
          lat: this.newJobPosition.lat,
          lng: this.newJobPosition.lng
        },
        open: this.addForm.value.open,
        owner: Meteor.userId()
      });

      this.addForm.reset();
    }
  }
}
