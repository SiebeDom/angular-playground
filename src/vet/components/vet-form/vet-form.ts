import {ChangeDetectionStrategy, Component, input, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {SelectButtonModule} from 'primeng/selectbutton';

type ConventionStatus = 'conventionalized' | 'not-conventionalized';

export interface VetFormControls {
  name: FormControl<string | null>;
  conventionName: FormControl<string | null>;
  conventionReason: FormControl<string | null>;
}

@Component({
  selector: 'app-vet-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputText, Message, ReactiveFormsModule, FormsModule, SelectButtonModule],
  templateUrl: './vet-form.html',
})
export class VetForm {
  vetFormGroup = input.required<FormGroup<VetFormControls>>();
  formSubmitted = input<boolean>(false);

  readonly conventionOptions = [
    {label: 'Conventionalized', value: 'conventionalized'},
    {label: 'Not conventionalized', value: 'not-conventionalized'},
  ];
  conventionStatus = signal<ConventionStatus>('conventionalized');

  isInvalid(controlName: keyof VetFormControls) {
    const control = this.vetFormGroup()?.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted());
  }

  getVetFormGroup() {
    return this.vetFormGroup() as FormGroup;
  }
}
