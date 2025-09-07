export interface Cocktail {
  name: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  amount: number;
  unit: Unit;
  name: string;
}

export type Unit = 'ml' | 'dash';
