import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs';
import {Menu} from 'primeng/menu';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Menu, Toast],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css',
})
export class AppLayout {
  router = inject(Router);

  currentUrl = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.router.url)
    ),
    {initialValue: this.router.url}
  );

  items = computed(() => [
    {
      label: 'Demo',
      expanded: this.currentUrl().startsWith('/pet') || this.currentUrl().startsWith('/vet'),
      items: [
        {
          label: 'Pets',
          routerLink: '/pet',
          styleClass: this.isActive('/pet'),
        },
        {
          label: 'Vets',
          routerLink: '/vet',
          styleClass: this.isActive('/vet'),
        },
      ],
    },
  ]);

  isActive(path: string): string {
    return this.currentUrl().startsWith(path) ? 'route-active' : '';
  }
}
