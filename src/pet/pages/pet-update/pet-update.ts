import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {getPetFormGroup} from '../../model/PetFormGroup';
import {PetForm, PetFormControls} from '../../components/pet-form/pet-form';
import {httpResource} from '@angular/common/http';

interface MainFormControls {
  pet: FormGroup<PetFormControls>;
}

@Component({
  selector: 'app-crud-update',
  imports: [
    ReactiveFormsModule,
    ButtonDirective,
    ButtonLabel,
    PetForm
  ],
  templateUrl: './pet-update.html'
})
export class PetUpdate {
  messageService = inject(MessageService);
  fb = inject(FormBuilder);
  router = inject(Router);
  httpClient = inject(HttpClient);

  id = input<string>();

  pet = httpResource<Vet>(() => `/api/pets/${this.id()}`);
  petValue = computed<Vet | undefined>(() => this.pet.hasValue() ? this.pet.value() : undefined);

  petForm: FormGroup<MainFormControls> = this.fb.nonNullable.group({
    pet: this.fb.nonNullable.group(getPetFormGroup())
  });
  formSubmitted = signal(false);

  constructor() {
    effect(() => {
      if (this.pet.hasValue()) {
        this.petForm.patchValue({ pet: this.petValue() });
      }
    });
  }

  async onSubmit() {
    this.formSubmitted.set(true);
    if (this.petForm.valid) {
      const response = await firstValueFrom(this.httpClient.put<Vet>(`/api/pets/${this.id()}`, this.petForm.value.pet));
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Pet with id ${response} updated`,
        life: 3000
      });
      this.router.navigate(['/pet']);
    }
  }

  getFormGroup() {
    return this.petForm.get('pet') as FormGroup
  }
}
