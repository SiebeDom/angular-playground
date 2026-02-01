import {Routes} from '@angular/router';
import {PetList} from '../pet/pages/pet-list/pet-list';
import {Homepage} from '../homepage/homepage';
import {PetCreate} from '../pet/pages/pet-create/pet-create';

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
  }
];
