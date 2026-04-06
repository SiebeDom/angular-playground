import {TestBed} from '@angular/core/testing';
import {describe, expect, it} from 'vitest';
import {page} from 'vitest/browser';
import {PetList} from './pet-list';
import {Pet} from '../../model/Pet';
import {HttpTestingController} from '@angular/common/http/testing';

describe(PetList.name, () => {
  it('Show pets', async () => {
    const { fixture, httpMock } = await mountPetList();

    const mockPets: Pet[] = [
      {id: '1', name: 'John', type: 'Dog', mood: 'Happy', birthDate: '2020-03-15T00:00:00.000Z'},
      {id: '2', name: 'Vince', type: 'Cat', mood: 'Grumpy', birthDate: '2018-07-22T00:00:00.000Z'},
    ]
    fixture.detectChanges();
    httpMock.expectOne('/api/pets').flush(mockPets);
    fixture.detectChanges();

    const rows = page.getByRole('row');
    await expect.element(rows).toHaveLength(3); // 1 header + 2 data rows
    await expect.element(rows.nth(1)).toHaveTextContent('John');
    await expect.element(rows.nth(2)).toHaveTextContent('Vince');
  });

  async function mountPetList() {
    const httpMock = TestBed.inject(HttpTestingController);
    const fixture = TestBed.createComponent(PetList);

    return {
      httpMock: httpMock,
      fixture: fixture
    };
  }
});
