import {FormControl, Validators} from '@angular/forms';

export function getVetFormGroup() {
  return {
    name: new FormControl<string>('', {validators: [Validators.required]})
  }
}
