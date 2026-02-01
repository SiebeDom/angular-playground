import {Component, inject, signal} from '@angular/core';
import {Toast} from 'primeng/toast';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {getPetFormGroup} from '../../model/PetFormGroup';
import {CrudForm, PetFormControls} from '../../components/crud-form/crud-form';

interface MainFormControls {
  pet: FormGroup<PetFormControls>;
}

@Component({
  selector: 'app-crud-create',
  imports: [
    Toast,
    ReactiveFormsModule,
    ButtonDirective,
    ButtonLabel,
    CrudForm
  ],
  templateUrl: './crud-create.html',
  styleUrl: './crud-create.css',
})
export class CrudCreate {
  messageService = inject(MessageService);
  fb = inject(FormBuilder);
  router = inject(Router);
  httpClient = inject(HttpClient);
  petForm: FormGroup<MainFormControls> = this.fb.nonNullable.group({
    pet: this.fb.nonNullable.group(getPetFormGroup())
  });
  formSubmitted = signal(false);

  async onSubmit() {
    this.formSubmitted.set(true);
    if (this.petForm.valid) {
      const response = await firstValueFrom(this.httpClient.post<Pet>('/api/pets', this.petForm.value.pet));
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Pet with id ${response} created`,
        life: 3000
      });
      this.router.navigate(['/crud']);
    }
  }

  getFormGroup() {
    return this.petForm.get('pet') as FormGroup
  }
}
