import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';

export interface VetFormControls {
  name: FormControl<string | null>;
}

@Component({
  selector: 'app-vet-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputText, Message, ReactiveFormsModule],
  templateUrl: './vet-form.html',
})
export class VetForm {
  vetFormGroup = input.required<FormGroup<VetFormControls>>();
  formSubmitted = input<boolean>(false);

  isInvalid(controlName: keyof VetFormControls) {
    const control = this.vetFormGroup()?.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted());
  }

  getVetFormGroup() {
    return this.vetFormGroup() as FormGroup;
  }
}
