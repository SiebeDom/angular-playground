import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VetForm} from './vet-form';
import {FormGroup} from '@angular/forms';
import {getVetFormGroup} from '../../model/VetFormGroup';

describe('CrudForm', () => {
  let component: VetForm;
  let fixture: ComponentFixture<VetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetForm);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('vetFormGroup', new FormGroup(getVetFormGroup()));
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
