import {Component, computed} from '@angular/core';
import {TableModule} from 'primeng/table';
import {httpResource} from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {ButtonDirective, ButtonLabel} from 'primeng/button';

@Component({
  selector: 'app-vet-list',
  imports: [
    TableModule,
    RouterLink,
    ButtonDirective,
    ButtonLabel
  ],
  templateUrl: './vet-list.html'
})
export class VetList {
  vets = httpResource<any[]>(() => `/api/vets`);
  vetsValue = computed<any[]>(() => this.vets.hasValue() ? this.vets.value() : []);
}
