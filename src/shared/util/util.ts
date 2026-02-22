import {FormGroup} from '@angular/forms';

export function markAllAsTouchedAndDirty(formGroup: FormGroup){
  formGroup.markAllAsTouched();
  formGroup.markAllAsDirty();
}
