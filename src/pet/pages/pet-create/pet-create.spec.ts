import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PetCreate} from './pet-create';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {App} from '../../../app/app';
import {By} from '@angular/platform-browser';

describe('PetCreate', () => {
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
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PetCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Pet create');
  });
});
