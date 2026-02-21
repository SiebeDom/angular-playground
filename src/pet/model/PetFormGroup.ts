import {FormControl, Validators} from '@angular/forms';

export function getPetFormGroup() {
  return {
    name: new FormControl<string>('', {validators: [Validators.required]}),
    type: new FormControl<string>('', {validators: [Validators.required]}),
    mood: new FormControl<string>('', {validators: [Validators.required]}),
    birthDate: new FormControl<string>('', {validators: [Validators.required]}),
  }
}
