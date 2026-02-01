import {Component, input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';

export interface PetFormControls {
  mood: FormControl<string | null>;
  name: FormControl<string | null>;
  type: FormControl<string | null>;
}

@Component({
  selector: 'app-crud-form',
  imports: [
    InputText,
    Message,
    ReactiveFormsModule
  ],
  templateUrl: './pet-form.html'
})
export class PetForm {
  petFormGroup = input.required<FormGroup<PetFormControls>>();

  formSubmitted = input<boolean>(false);

  isInvalid(controlName: keyof PetFormControls) {
    const control = this.petFormGroup()?.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted());
  }
}
