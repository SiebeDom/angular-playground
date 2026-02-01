import {Routes} from '@angular/router';
import {PetList} from '../pet/pages/pet-list/pet-list';
import {Homepage} from '../homepage/homepage';
import {PetCreate} from '../pet/pages/pet-create/pet-create';
import {PetUpdate} from '../pet/pages/pet-update/pet-update';
import {VetCreate} from '../vet/pages/vet-create/vet-create';
import {VetWithPets} from '../vet/pages/vet-with-pets/vet-with-pets';
import {VetList} from '../vet/pages/vet-list/vet-list';

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
  },
  {
    path: 'vet',
    component: VetList
  },
  {
    path: 'vet/create',
    component: VetCreate,
  },
  {
    path: 'vet/createWithPets',
    component: VetWithPets,
  }
];
