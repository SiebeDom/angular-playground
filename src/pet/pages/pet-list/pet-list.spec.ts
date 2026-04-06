import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpTestingController} from '@angular/common/http/testing';
import {PetList} from './pet-list';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {Pet} from '../../model/Pet';

describe('PetList', () => {
  let fixture: ComponentFixture<PetList>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetList],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {paramMap: of({get: () => null})},
        },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PetList);
    fixture.detectChanges(); // triggers the data fetch
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should display a single pet name returned from the server', async () => {
    const mockPets: Pet[] = [{id: '1', name: 'Buddy', type: 'Dog', mood: 'Happy', birthDate: '01-01-2020'}];

    httpMock.expectOne('/api/pets').flush(mockPets);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Buddy');
  });

  it('should display all pet names when multiple pets are returned', async () => {
    const mockPets: Pet[] = [
      {id: '1', name: 'Rex', type: 'Dog', mood: 'Excited', birthDate: '01-01-2020'},
      {id: '2', name: 'Luna', type: 'Cat', mood: 'Lazy', birthDate: '01-01-2020'},
      {id: '3', name: 'Tweety', type: 'Bird', mood: 'Cheerful', birthDate: '01-01-2020'},
    ];

    httpMock.expectOne('/api/pets').flush(mockPets);
    await fixture.whenStable();
    fixture.detectChanges();

    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain('Rex');
    expect(text).toContain('Luna');
    expect(text).toContain('Tweety');
  });

  it('should render one table row per pet', async () => {
    const mockPets: Pet[] = [
      {id: '1', name: 'Buddy', type: 'Dog', mood: 'Happy', birthDate: '01-01-2020'},
      {id: '2', name: 'Whiskers', type: 'Cat', mood: 'Calm', birthDate: '01-01-2020'},
    ];

    httpMock.expectOne('/api/pets').flush(mockPets);
    await fixture.whenStable();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockPets.length);
  });
});
