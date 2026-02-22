export type Pet = {
  id: string;
  name: string;
  type: 'Dog' | 'Cat';
  mood: string;
  birthDate: string | null;
};

let pets: Pet[] = [
  { id: '1', name: 'John', type: 'Dog', mood: 'Happy', birthDate: '2020-03-15T00:00:00.000Z' },
  { id: '2', name: 'Vince', type: 'Cat', mood: 'Grumpy', birthDate: '2018-07-22T00:00:00.000Z' },
];

export const petsDb = {
  getAll: () => pets,

  getById: (id: string) =>
    pets.find(p => p.id === id),

  create: (pet: Omit<Pet, 'id'>) => {
    const newPet: Pet = {
      id: crypto.randomUUID(),
      ...pet,
    };
    pets.push(newPet);
    return newPet.id;
  },

  update: (id: string, update: Partial<Pet>) => {
    const index = pets.findIndex(p => p.id === id);
    if (index === -1) return null;

    pets[index] = { ...pets[index], ...update };
    return pets[index];
  },

  delete: (id: string) => {
    const before = pets.length;
    pets = pets.filter(p => p.id !== id);
    return pets.length < before;
  },

  reset: () => {
    pets = [...pets];
  }
};
