import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpTestingController} from '@angular/common/http/testing';
import {VetList} from './vet-list';
import {provideRouter} from '@angular/router';

describe('CrudList', () => {
  let component: VetList;
  let fixture: ComponentFixture<VetList>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetList],
      providers: [provideRouter([])],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(VetList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock.expectOne('/api/vets').flush([]);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
