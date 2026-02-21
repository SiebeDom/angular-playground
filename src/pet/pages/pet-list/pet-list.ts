import {ChangeDetectionStrategy, Component, computed} from '@angular/core';
import {TableModule} from 'primeng/table';
import {httpResource} from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {Pet} from '../../model/Pet';

@Component({
  selector: 'app-pet-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableModule, RouterLink, Button],
  templateUrl: './pet-list.html',
})
export class PetList {
  pets = httpResource<Pet[]>(() => `/api/pets`);
  petsValue = computed<Pet[]>(() => this.pets.value() ?? []);
}
