import {ChangeDetectionStrategy, Component, effect, inject, input} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Button} from 'primeng/button';
import {HttpClient, httpResource} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {getPetFormGroup} from '../../model/PetFormGroup';
import {PetForm, PetFormControls} from '../../components/pet-form/pet-form';
import {Pet} from '../../model/Pet';
import {markAllAsTouchedAndDirty} from '../../../shared/util/util';

interface MainFormControls {
  pet: FormGroup<PetFormControls>;
}

@Component({
  selector: 'app-pet-update',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, Button, PetForm],
  templateUrl: './pet-update.html',
})
export class PetUpdate {
  messageService = inject(MessageService);
  fb = inject(FormBuilder);
  router = inject(Router);
  httpClient = inject(HttpClient);

  id = input<string>();

  pet = httpResource<Pet>(() => `/api/pets/${this.id()}`);

  petForm: FormGroup<MainFormControls> = this.fb.nonNullable.group({
    pet: this.fb.nonNullable.group(getPetFormGroup()),
  });

  private readonly fillFormEffect = effect(() => {
    if (this.pet.hasValue()) {
      const pet = this.pet.value()!;
      this.petForm.patchValue({
        pet: {...pet, birthDate: pet.birthDate ? new Date(pet.birthDate) : null},
      });
    }
    if (this.pet.error()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Not found',
        detail: 'Pet not found.',
        life: 3000,
      });
      this.router.navigate(['/pet']);
    }
  });

  async onSubmit() {
    if (this.petForm.invalid) {
      markAllAsTouchedAndDirty(this.petForm);
      return
    }
    try {
      const response = await firstValueFrom(
        this.httpClient.put<Pet>(`/api/pets/${this.id()}`, this.petForm.value.pet)
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Pet with id ${response.id} updated`,
        life: 3000,
      });
      this.router.navigate(['/pet']);
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to update pet. Please try again.',
        life: 3000,
      });
    }
  }

  getFormGroup() {
    return this.petForm.get('pet') as FormGroup;
  }
}
