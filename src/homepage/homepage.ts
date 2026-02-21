import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-homepage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  router = inject(Router);
}
