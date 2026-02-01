import {Component, computed} from '@angular/core';
import {TableModule} from 'primeng/table';
import {httpResource} from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {ButtonDirective, ButtonLabel} from 'primeng/button';

@Component({
  selector: 'app-crud-list',
  imports: [
    TableModule,
    RouterLink,
    ButtonDirective,
    ButtonLabel
  ],
  templateUrl: './pet-list.html'
})
export class PetList {
  pets = httpResource<any[]>(() => `/api/pets`);
  petsValue = computed<any[]>(() => this.pets.hasValue() ? this.pets.value() : []);
}
