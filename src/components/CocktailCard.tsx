import type { Cocktail } from '../model.ts';
import { Link } from 'react-router';

export interface Props {
  cocktail: Cocktail;
}

export const CocktailCard = ({cocktail}: Props) => (
  <Link to={`/cocktails/${cocktail.id}`}>
    {cocktail.name}
  </Link>
);