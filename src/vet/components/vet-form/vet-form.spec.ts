import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetForm } from './vet-form';

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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
