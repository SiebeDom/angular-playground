export type Vet = {
  id: string;
  name: string;
};

let vets: Vet[] = [
  {id: '1', name: 'Dr. Smith'},
  {id: '2', name: 'Dr. Jones'},
];

export const vetsDb = {
  getAll: () => vets,

  getById: (id: string) => vets.find(v => v.id === id),

  create: (vet: Omit<Vet, 'id'>) => {
    const newVet: Vet = {id: crypto.randomUUID(), ...vet};
    vets.push(newVet);
    return newVet.id;
  },
};
