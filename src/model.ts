export interface Cocktail {
  name: string;
  ingredients: Ingredient[];
  description: string;
}

export interface Ingredient {
  amount: number;
  unit: Unit;
  name: string;
}

export type Unit = 'ml' | 'dash';

export function isUnit(value: string): value is Unit {
  return value === 'ml' || value === 'dash';
}
