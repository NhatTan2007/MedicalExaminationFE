import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-neurology-examination',
  templateUrl: './neurology-examination.component.html',
  styleUrls: ['./neurology-examination.component.scss'],
})
export class NeurologyExaminationComponent implements OnInit {
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
