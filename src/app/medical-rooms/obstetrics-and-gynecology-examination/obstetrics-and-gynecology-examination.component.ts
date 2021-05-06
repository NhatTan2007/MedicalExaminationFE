import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-obstetrics-and-gynecology-examination',
  templateUrl: './obstetrics-and-gynecology-examination.component.html',
  styleUrls: ['./obstetrics-and-gynecology-examination.component.scss'],
})
export class ObstetricsAndGynecologyExaminationComponent implements OnInit {
  createForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      result: '',
    });
  }

  onSubmit(): void {
    console.log(this.createForm.value);
  }
}
