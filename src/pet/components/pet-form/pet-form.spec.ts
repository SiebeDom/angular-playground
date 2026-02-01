import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetForm } from './pet-form';
import {FormGroup} from '@angular/forms';
import {getPetFormGroup} from '../../model/PetFormGroup';

describe('PetForm', () => {
  let component: PetForm;
  let fixture: ComponentFixture<PetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetForm);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('petFormGroup', new FormGroup(getPetFormGroup()));
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
