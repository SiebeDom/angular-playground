import { ComponentFixture, TestBed } from '@angular/core/testing';
import {VetWithPets} from './vet-with-pets';
import {MessageService} from 'primeng/api';


describe('VetWithvets', () => {
  let component: VetWithPets;
  let fixture: ComponentFixture<VetWithPets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetWithPets],
      providers: [
        MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetWithPets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
