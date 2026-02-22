import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../homepage/homepage').then(m => m.Homepage),
  },
  {
    path: 'pet',
    loadComponent: () => import('../pet/pages/pet-list/pet-list').then(m => m.PetList),
  },
  {
    path: 'pet/create',
    loadComponent: () => import('../pet/pages/pet-create/pet-create').then(m => m.PetCreate),
  },
  {
    path: 'pet/update/:id',
    loadComponent: () => import('../pet/pages/pet-update/pet-update').then(m => m.PetUpdate),
  },
  {
    path: 'vet',
    loadComponent: () => import('../vet/pages/vet-list/vet-list').then(m => m.VetList),
  },
  {
    path: 'vet/create',
    loadComponent: () => import('../vet/pages/vet-create/vet-create').then(m => m.VetCreate),
  },
  {
    path: 'vet/update/:id',
    loadComponent: () => import('../vet/pages/vet-update/vet-update').then(m => m.VetUpdate),
  },
  {
    path: 'vet/createWithPets',
    loadComponent: () => import('../vet/pages/vet-with-pets/vet-with-pets').then(m => m.VetWithPets),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
