import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetList } from './pet-list';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('CrudList', () => {
  let component: PetList;
  let fixture: ComponentFixture<PetList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetList],
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

    fixture = TestBed.createComponent(PetList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
