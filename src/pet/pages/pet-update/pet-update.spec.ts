import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpTestingController} from '@angular/common/http/testing';
import {PetUpdate} from './pet-update';
import {provideRouter} from '@angular/router';

describe('CrudCreate', () => {
  let component: PetUpdate;
  let fixture: ComponentFixture<PetUpdate>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetUpdate],
      providers: [provideRouter([])],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PetUpdate);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '1');
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', async () => {
    httpMock.expectOne('/api/pets/1').flush({id: '1', name: 'Buddy', type: 'Dog', mood: 'Happy', birthDate: '01-01-2020'});
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });
});
