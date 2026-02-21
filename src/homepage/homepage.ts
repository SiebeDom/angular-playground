import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {Button} from 'primeng/button';
import {
  AngularLibraryPlayground
} from '../../../../angular-library-playground/angular-library-playground-workspace/dist/angular-library-playground';

@Component({
  selector: 'app-homepage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, AngularLibraryPlayground],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  router = inject(Router);
}
