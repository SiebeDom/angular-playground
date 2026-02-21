import { http, HttpResponse } from 'msw';
import { petsDb, Pet } from './pets.db';

export const handlers = [

  // READ all
  http.get('/api/pets', () => {
    return HttpResponse.json(petsDb.getAll());
  }),

  // READ one
  http.get('/api/pets/:id', ({ params }) => {
    const pet = petsDb.getById(params['id'] as string);

    if (!pet) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(pet);
  }),

  // CREATE
  http.post<{}, Omit<Pet, 'id'>>('/api/pets', async ({ request }) => {
    const body = await request.json();
    const created = petsDb.create(body);

    return HttpResponse.json(created, { status: 201 });
  }),

  // UPDATE
  http.put<{ id: string }, Partial<Pet>>(
    '/api/pets/:id',
    async ({ params, request }) => {
      const body = await request.json();
      const updated = petsDb.update(params['id'] as string, body);

      if (!updated) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json(updated);
    }
  ),

  // DELETE
  http.delete('/api/pets/:id', ({ params }) => {
    const deleted = petsDb.delete(params['id'] as string);

    if (!deleted) {
      return new HttpResponse(null, { status: 404 });
    }

    return new HttpResponse(null, { status: 204 });
  }),

  //Vet with pets

  // CREATE
  http.post<{}, Omit<Pet, 'id'>>('/api/vetWithPets', async ({ request }) => {
    const body = await request.json();
    console.log(body);
    //const created = petsDb.create(body);

    return HttpResponse.json(crypto.randomUUID(), { status: 201 });
  }),
];
