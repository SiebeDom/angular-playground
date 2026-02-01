import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PetUpdate} from './pet-update';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {MessageService} from 'primeng/api';

describe('CrudCreate', () => {
  let component: PetUpdate;
  let fixture: ComponentFixture<PetUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetUpdate],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({get: () => 1}),
          }
        },
        {
          provide: MessageService
        }

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  })
  ;

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
