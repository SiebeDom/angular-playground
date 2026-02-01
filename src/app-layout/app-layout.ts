import {Component, computed, inject} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs';
import {Menu} from 'primeng/menu';
import {ReactiveFormsModule} from '@angular/forms';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-layout',
  imports: [
    RouterLink,
    Menu,
    ReactiveFormsModule,
    Toast

  ],
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
    { initialValue: this.router.url }
  );

  items = computed(() => [
    {
      label: 'Demo',
      expanded: this.currentUrl().startsWith('/pet'),
      items: [
        {
          label: 'Pets',
          routerLink: '/pet',
          // icon: 'pi pi-plus',
          styleClass: this.isActive('/pet')
        },
        {
          label: 'Vets',
          routerLink: '/vet',
          // icon: 'pi pi-search'
        }
      ]
    },
    // {
    //   label: 'Something else',
    //   items: [
    //     {
    //       label: 'Bla',
    //       icon: 'pi pi-cog'
    //     },
    //     {
    //       label: 'Test',
    //       icon: 'pi pi-sign-out'
    //     }
    //   ]
    // }
  ]);

  isActive(path: string): string {
    return this.currentUrl().startsWith(path)
      ? 'route-active'
      : '';
  }
}
