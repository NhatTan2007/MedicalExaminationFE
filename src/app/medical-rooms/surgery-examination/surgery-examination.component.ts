import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-surgery-examination',
  templateUrl: './surgery-examination.component.html',
  styleUrls: ['./surgery-examination.component.scss'],
})
export class SurgeryExaminationComponent implements OnInit {
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
