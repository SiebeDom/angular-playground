import {ChangeDetectionStrategy, Component, effect, inject, input, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Button} from 'primeng/button';
import {HttpClient, httpResource} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';
import {getVetFormGroup} from '../../model/VetFormGroup';
import {VetForm, VetFormControls} from '../../components/vet-form/vet-form';
import {Vet} from '../../model/Vet';
import {markAllAsTouchedAndDirty} from '../../../shared/util/util';

type ConventionStatus = 'conventionalized' | 'not-conventionalized';

interface MainFormControls {
  vet: FormGroup<VetFormControls>;
}

@Component({
  selector: 'app-vet-update',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, Button, VetForm],
  templateUrl: './vet-update.html',
})
export class VetUpdate {
  messageService = inject(MessageService);
  fb = inject(FormBuilder);
  router = inject(Router);
  httpClient = inject(HttpClient);

  id = input<string>();

  vet = httpResource<Vet>(() => `/api/vets/${this.id()}`);

  vetForm: FormGroup<MainFormControls> = this.fb.nonNullable.group({
    vet: this.fb.nonNullable.group(getVetFormGroup()),
  });
  formSubmitted = signal(false);
  conventionStatus = signal<ConventionStatus>('conventionalized');

  private readonly fillFormEffect = effect(() => {
    if (this.vet.hasValue()) {
      const vet = this.vet.value()!;
      this.vetForm.patchValue({vet});
      this.conventionStatus.set(vet.conventionName ? 'conventionalized' : 'not-conventionalized');
    }
    if (this.vet.error()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Not found',
        detail: 'Vet not found.',
        life: 3000,
      });
      this.router.navigate(['/vet']);
    }
  });

  async onSubmit() {
    this.formSubmitted.set(true);
    if (this.vetForm.invalid) {
      markAllAsTouchedAndDirty(this.vetForm);
      return;
    }
    try {
      const response = await firstValueFrom(
        this.httpClient.put<Vet>(`/api/vets/${this.id()}`, this.vetForm.value.vet)
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Vet ${response.name} updated`,
        life: 3000,
      });
      this.router.navigate(['/vet']);
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to update vet. Please try again.',
        life: 3000,
      });
    }
  }

  getFormGroup() {
    return this.vetForm.get('vet') as FormGroup;
  }
}
