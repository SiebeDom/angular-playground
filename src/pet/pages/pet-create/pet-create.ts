import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Button} from 'primeng/button';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {getPetFormGroup} from '../../model/PetFormGroup';
import {PetForm, PetFormControls} from '../../components/pet-form/pet-form';
import {Pet} from '../../model/Pet';

interface MainFormControls {
  pet: FormGroup<PetFormControls>;
}

@Component({
  selector: 'app-pet-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, Button, PetForm],
  templateUrl: './pet-create.html',
})
export class PetCreate {
  messageService = inject(MessageService);
  fb = inject(FormBuilder);
  router = inject(Router);
  httpClient = inject(HttpClient);

  petForm: FormGroup<MainFormControls> = this.fb.nonNullable.group({
    pet: this.fb.nonNullable.group(getPetFormGroup()),
  });

  async onSubmit() {
    if (this.petForm.invalid) {
      this.petForm.markAllAsDirty();
      this.petForm.markAllAsTouched();
      return
    }
    try {
      const response = await firstValueFrom(
        this.httpClient.post<Pet>('/api/pets', this.petForm.value.pet)
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Pet with id ${response} created`,
        life: 3000,
      });
      this.router.navigate(['/pet']);
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create pet. Please try again.',
        life: 3000,
      });
    }
  }

  getFormGroup() {
    return this.petForm.get('pet') as FormGroup;
  }
}
