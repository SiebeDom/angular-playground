import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetForm } from './pet-form';
import {FormGroup} from '@angular/forms';
import {getPetFormGroup} from '../../model/PetFormGroup';
import {inputBinding} from '@angular/core';

describe('PetForm', () => {
  let component: PetForm;
  let fixture: ComponentFixture<PetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetForm, {
      bindings: [
        inputBinding('petFormGroup', () => new FormGroup(getPetFormGroup()))
      ]
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
