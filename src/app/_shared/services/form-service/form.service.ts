import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
	form: FormGroup
	constructor() { }

	isError(name: string){
		return this.form.get(name).errors;
	}

	isTouched(name: string){
		return this.form.get(name).touched;
	}

	hasError(name: string, errorName: string){
		return this.form.get(name).hasError(errorName);
	}
}
