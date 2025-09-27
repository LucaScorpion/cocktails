export interface Cocktail {
  id: string;
  name: string;
  ingredients: Ingredient[];
  description: string;
}

export interface Ingredient {
  amount: number;
  unit: string;
  name: string;
}
