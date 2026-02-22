//Use different object for every kind of operation
export interface Pet {
  id: string;
  name: string;
  type: string;
  mood: string;
  birthDate: string | null;
}
