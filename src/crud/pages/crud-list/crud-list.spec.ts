import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudList } from './crud-list';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('CrudList', () => {
  let component: CrudList;
  let fixture: ComponentFixture<CrudList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudList],
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

    fixture = TestBed.createComponent(CrudList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
