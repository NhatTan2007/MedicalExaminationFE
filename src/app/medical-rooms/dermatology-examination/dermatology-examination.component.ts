import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dermatology-examination',
  templateUrl: './dermatology-examination.component.html',
  styleUrls: ['./dermatology-examination.component.scss'],
})
export class DermatologyExaminationComponent implements OnInit {
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
