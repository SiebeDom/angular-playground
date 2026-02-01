import {Routes} from '@angular/router';
import {PetList} from '../pet/pages/pet-list/pet-list';
import {Homepage} from '../homepage/homepage';
import {PetCreate} from '../pet/pages/pet-create/pet-create';
import {PetUpdate} from '../pet/pages/pet-update/pet-update';

export const routes: Routes = [
  {
    path: '',
    component: Homepage,
  },
  {
    path: 'pet',
    component: PetList
  },
  {
    path: 'pet/create',
    component: PetCreate,
  },
  {
    path: 'pet/update/:id',
    component: PetUpdate,
  }
];
