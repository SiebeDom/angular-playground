import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PetCreate} from './pet-create';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {MessageService} from 'primeng/api';

describe('CrudCreate', () => {
  let component: PetCreate;
  let fixture: ComponentFixture<PetCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetCreate],
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

    fixture = TestBed.createComponent(PetCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  })
  ;

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
