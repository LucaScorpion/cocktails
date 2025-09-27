import { CocktailGrid } from './components/CocktailGrid.tsx';
import { cocktails } from './cocktails.ts';

export const App = () => {
  return (
    <>
      <section>
        <h1>Luca's Cocktails</h1>
      </section>
      <section>
        <CocktailGrid cocktails={cocktails}/>
      </section>
    </>
  );
};
