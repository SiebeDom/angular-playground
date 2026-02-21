import {ChangeDetectionStrategy, Component, computed} from '@angular/core';
import {TableModule} from 'primeng/table';
import {httpResource} from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {Vet} from '../../model/Vet';

@Component({
  selector: 'app-vet-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableModule, RouterLink, Button],
  templateUrl: './vet-list.html',
})
export class VetList {
  vets = httpResource<Vet[]>(() => `/api/vets`);
  vetsValue = computed<Vet[]>(() => this.vets.value() ?? []);
}
