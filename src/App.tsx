import { CocktailGrid } from './components/CocktailGrid.tsx';
import { cocktails } from './cocktails.ts';

export const App = () => {
  return (
    <>
      <h1>Luca's Cocktails</h1>
      <CocktailGrid cocktails={cocktails}/>
    </>
  );
};
