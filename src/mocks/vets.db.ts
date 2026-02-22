export type Vet = {
  id: string;
  name: string;
  conventionName: string | null;
  conventionReason: string | null;
};

let vets: Vet[] = [
  {id: '1', name: 'Dr. Smith', conventionName: 'AMA Convention', conventionReason: null},
  {id: '2', name: 'Dr. Jones', conventionName: null, conventionReason: 'Independent practice'},
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
