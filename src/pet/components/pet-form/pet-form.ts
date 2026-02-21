import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {DatePicker} from 'primeng/datepicker';

export interface PetFormControls {
  mood: FormControl<string | null>;
  name: FormControl<string | null>;
  type: FormControl<string | null>;
  birthDate: FormControl<string | null>;
}

@Component({
  selector: 'app-pet-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputText, Message, ReactiveFormsModule, DatePicker],
  templateUrl: './pet-form.html',
})
export class PetForm {
  petFormGroup = input.required<FormGroup<PetFormControls>>();

  isInvalid(controlName: keyof PetFormControls) {
    const control = this.petFormGroup()?.get(controlName);
    return control?.invalid && (control.dirty);
  }

  getPetFormGroup() {
    return this.petFormGroup() as FormGroup;
  }
}
