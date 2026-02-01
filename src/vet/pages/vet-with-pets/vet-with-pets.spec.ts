import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetWithvets } from './vet-with-vets';

describe('VetWithvets', () => {
  let component: VetWithvets;
  let fixture: ComponentFixture<VetWithvets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetWithvets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetWithvets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
