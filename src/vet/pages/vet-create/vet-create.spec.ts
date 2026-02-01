import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VetCreate} from './vet-create';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {MessageService} from 'primeng/api';

describe('CrudCreate', () => {
  let component: VetCreate;
  let fixture: ComponentFixture<VetCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetCreate],
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

    fixture = TestBed.createComponent(VetCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  })
  ;

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
