import {http, HttpResponse} from 'msw';
import {petsDb, Pet} from './pets.db';
import {vetsDb, Vet} from './vets.db';

export const handlers = [
  // Pets - READ all
  http.get('/api/pets', () => {
    return HttpResponse.json(petsDb.getAll());
  }),

  // Pets - READ one
  http.get('/api/pets/:id', ({params}) => {
    const pet = petsDb.getById(params['id'] as string);
    if (!pet) {
      return new HttpResponse(null, {status: 404});
    }
    return HttpResponse.json(pet);
  }),

  // Pets - CREATE
  http.post<object, Omit<Pet, 'id'>>('/api/pets', async ({request}) => {
    const body = await request.json();
    const created = petsDb.create(body);
    return HttpResponse.json(created, {status: 201});
  }),

  // Pets - UPDATE
  http.put<{id: string}, Partial<Pet>>('/api/pets/:id', async ({params, request}) => {
    const body = await request.json();
    const updated = petsDb.update(params['id'] as string, body);
    if (!updated) {
      return new HttpResponse(null, {status: 404});
    }
    return HttpResponse.json(updated);
  }),

  // Pets - DELETE
  http.delete('/api/pets/:id', ({params}) => {
    const deleted = petsDb.delete(params['id'] as string);
    if (!deleted) {
      return new HttpResponse(null, {status: 404});
    }
    return new HttpResponse(null, {status: 204});
  }),

  // Vets - READ all
  http.get('/api/vets', () => {
    return HttpResponse.json(vetsDb.getAll());
  }),

  // Vets - READ one
  http.get('/api/vets/:id', ({params}) => {
    const vet = vetsDb.getById(params['id'] as string);
    if (!vet) {
      return new HttpResponse(null, {status: 404});
    }
    return HttpResponse.json(vet);
  }),

  // Vets - UPDATE
  http.put<{id: string}, Partial<Vet>>('/api/vets/:id', async ({params, request}) => {
    const body = await request.json();
    const updated = vetsDb.update(params['id'] as string, body);
    if (!updated) {
      return new HttpResponse(null, {status: 404});
    }
    return HttpResponse.json(updated);
  }),

  // Vets - CREATE
  http.post<object, Omit<Vet, 'id'>>('/api/vets', async ({request}) => {
    const body = await request.json();
    const created = vetsDb.create(body);
    return HttpResponse.json(created, {status: 201});
  }),

  // Vet with pets - CREATE
  http.post('/api/vetWithPets', async ({request}) => {
    const body = await request.json() as {vet: Omit<Vet, 'id'>; pets: Omit<Pet, 'id'>[]};
    const created = vetsDb.create(body.vet);
    return HttpResponse.json(created, {status: 201});
  }),
];
