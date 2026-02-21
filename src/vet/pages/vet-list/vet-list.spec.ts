import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetList } from './vet-list';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('CrudList', () => {
  let component: VetList;
  let fixture: ComponentFixture<VetList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetList],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 1 }),
          },
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
