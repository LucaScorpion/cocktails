export interface Cocktail {
  name: string;
  ingredients: Ingredient[];
  description: string;
}

export interface Ingredient {
  amount: number;
  unit: string;
  name: string;
}
