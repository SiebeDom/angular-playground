import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {getVetFormGroup} from '../../model/VetFormGroup';
import {VetForm, VetFormControls} from '../../components/vet-form/vet-form';
import {getPetFormGroup} from '../../../pet/model/PetFormGroup';
import {PetForm, PetFormControls} from '../../../pet/components/pet-form/pet-form';
import {firstValueFrom} from 'rxjs';
import {Vet} from '../../model/Vet';

interface MainFormControls {
  vet: FormGroup<VetFormControls>;
  pets: FormArray<FormGroup<PetFormControls>>;
}

@Component({
  selector: 'app-vet-with-pets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Stepper, StepList, Step, StepPanels, StepPanel, Button, ReactiveFormsModule, VetForm, PetForm],
  templateUrl: './vet-with-pets.html',
})
export class VetWithPets {
  messageService = inject(MessageService);
  fb = inject(FormBuilder);
  router = inject(Router);
  httpClient = inject(HttpClient);

  vetWithPetsForm: FormGroup<MainFormControls> = this.fb.nonNullable.group({
    vet: this.fb.nonNullable.group(getVetFormGroup()),
    pets: this.fb.nonNullable.array([this.fb.nonNullable.group(getPetFormGroup())]),
  });
  formSubmitted = signal(false);

  async onSubmit() {
    this.formSubmitted.set(true);
    if (this.vetWithPetsForm.valid) {
      try {
        const response = await firstValueFrom(
          this.httpClient.post<Vet>('/api/vetWithPets', {
            vet: this.vetWithPetsForm.value.vet,
            pets: this.vetWithPetsForm.value.pets,
          })
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Vet and pets with id ${response} created`,
          life: 3000,
        });
        this.router.navigate(['/vet']);
      } catch {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create vet with pets. Please try again.',
          life: 3000,
        });
      }
    }
  }

  getVetFormGroup() {
    return this.vetWithPetsForm.get('vet') as FormGroup;
  }

  get pets() {
    return this.vetWithPetsForm.get('pets') as FormArray;
  }

  addPet() {
    this.pets.push(this.fb.nonNullable.group(getPetFormGroup()));
  }

  convertToFormGroup(pet: AbstractControl) {
    return pet as FormGroup;
  }
}
