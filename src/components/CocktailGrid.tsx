import type { Cocktail } from '../model.ts';
import styles from './CocktailGrid.module.scss';
import { CocktailCard } from './CocktailCard.tsx';

export interface Props {
  cocktails: Cocktail[];
}

export const CocktailGrid = ({cocktails}: Props) => (
  <div className={styles.grid}>
    {cocktails.map((c) => (
      <CocktailCard key={c.id} cocktail={c}/>
    ))}
  </div>
);