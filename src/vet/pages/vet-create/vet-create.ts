import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Button} from 'primeng/button';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {getVetFormGroup} from '../../model/VetFormGroup';
import {VetForm, VetFormControls} from '../../components/vet-form/vet-form';
import {Vet} from '../../model/Vet';
import {markAllAsTouchedAndDirty} from '../../../shared/util/util';

interface MainFormControls {
  vet: FormGroup<VetFormControls>;
}

@Component({
  selector: 'app-vet-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, Button, VetForm],
  templateUrl: './vet-create.html',
})
export class VetCreate {
  messageService = inject(MessageService);
  fb = inject(FormBuilder);
  router = inject(Router);
  httpClient = inject(HttpClient);

  vetForm: FormGroup<MainFormControls> = this.fb.nonNullable.group({
    vet: this.fb.nonNullable.group(getVetFormGroup()),
  });
  formSubmitted = signal(false);

  async onSubmit() {
    this.formSubmitted.set(true);
    if (this.vetForm.invalid) {
      markAllAsTouchedAndDirty(this.vetForm);
      return
    }
    try {
      const response = await firstValueFrom(
        this.httpClient.post<Vet>('/api/vets', this.vetForm.value.vet)
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Vet with id ${response} created`,
        life: 3000,
      });
      this.router.navigate(['/vet']);
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create vet. Please try again.',
        life: 3000,
      });
    }
  }

  getFormGroup() {
    return this.vetForm.get('vet') as FormGroup;
  }
}
