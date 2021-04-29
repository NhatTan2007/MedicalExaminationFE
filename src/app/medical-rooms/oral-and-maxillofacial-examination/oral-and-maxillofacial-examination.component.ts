import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-oral-and-maxillofacial-examination',
  templateUrl: './oral-and-maxillofacial-examination.component.html',
  styleUrls: ['./oral-and-maxillofacial-examination.component.scss'],
})
export class OralAndMaxillofacialExaminationComponent implements OnInit {
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
