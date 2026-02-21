import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-homepage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {}
