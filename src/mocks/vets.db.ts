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

  update: (id: string, data: Partial<Omit<Vet, 'id'>>) => {
    const index = vets.findIndex(v => v.id === id);
    if (index === -1) return null;
    vets[index] = {...vets[index], ...data};
    return vets[index];
  },
};
