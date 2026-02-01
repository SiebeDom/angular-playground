import {Component, computed} from '@angular/core';
import {TableModule} from 'primeng/table';
import {httpResource} from '@angular/common/http';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-crud-list',
  imports: [
    TableModule,
    RouterLink
  ],
  templateUrl: './crud-list.html',
  styleUrl: './crud-list.css',
})
export class CrudList {
  pets = httpResource<any[]>(() => `/api/pets`);
  petsValue = computed<any[]>(() => this.pets.hasValue() ? this.pets.value() : []);
}
