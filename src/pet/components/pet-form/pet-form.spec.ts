import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetForm } from './pet-form';

describe('CrudForm', () => {
  let component: PetForm;
  let fixture: ComponentFixture<PetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
