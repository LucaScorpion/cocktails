import type { Cocktail } from '../model.ts';
import { Link } from 'react-router';
import styles from './CocktailCard.module.scss';

export interface Props {
  cocktail: Cocktail;
}

export const CocktailCard = ({cocktail}: Props) => (
  <Link to={`/cocktails/${cocktail.id}`} className={styles.card}>
    {cocktail.name}
  </Link>
);