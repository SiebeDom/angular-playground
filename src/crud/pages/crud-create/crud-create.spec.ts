import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CrudCreate} from './crud-create';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {MessageService} from 'primeng/api';

describe('CrudCreate', () => {
  let component: CrudCreate;
  let fixture: ComponentFixture<CrudCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudCreate],
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

    fixture = TestBed.createComponent(CrudCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  })
  ;

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
