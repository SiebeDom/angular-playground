import {Routes} from '@angular/router';
import {CrudList} from '../crud/pages/crud-list/crud-list';
import {Homepage} from '../homepage/homepage';
import {CrudCreate} from '../crud/pages/crud-create/crud-create';

export const routes: Routes = [
  {
    path: '',
    component: Homepage,
  },
  {
    path: 'crud',
    component: CrudList
  },
  {
    path: 'crud/create',
    component: CrudCreate,
  }
];
