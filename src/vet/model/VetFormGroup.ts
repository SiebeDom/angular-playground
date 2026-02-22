import {FormControl, Validators} from '@angular/forms';

export function getVetFormGroup() {
  return {
    name: new FormControl<string>('', {validators: [Validators.required]}),
    conventionName: new FormControl<string>(''),
    conventionReason: new FormControl<string>(''),
  };
}
