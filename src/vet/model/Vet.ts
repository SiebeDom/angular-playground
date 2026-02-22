//Use different object for every kind of operation
export interface Vet {
  id: string;
  name: string;
  conventionName: string | null;
  conventionReason: string | null;
}
