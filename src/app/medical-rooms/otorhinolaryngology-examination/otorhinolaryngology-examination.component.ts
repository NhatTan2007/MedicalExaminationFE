import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-otorhinolaryngology-examination',
  templateUrl: './otorhinolaryngology-examination.component.html',
  styleUrls: ['./otorhinolaryngology-examination.component.scss'],
})
export class OtorhinolaryngologyExaminationComponent implements OnInit {
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
