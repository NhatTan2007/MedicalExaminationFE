import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  createForm1: FormGroup;
  createForm2: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm1 = this.formBuilder.group({
      result1: '',
    });

    this.createForm2 = this.formBuilder.group({
      result2: '',
    });
  }
  onSubmit1(): void {
    console.log(this.createForm1.value);
  }

  onSubmit2(): void {
    console.log(this.createForm2.value);
  }
}
