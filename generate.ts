import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { type Cocktail, type Ingredient, isUnit, type Unit } from './src/model.ts';

const cocktailsDir = path.resolve(import.meta.dirname, 'cocktails');

const unitMapping: Record<string, Unit> = {
  dashes: 'dash'
};

void (async () => {
  const files = await fs.readdir(cocktailsDir);

  for (const file of files) {
    await processCocktail(file);
  }
})();

async function processCocktail(file: string): Promise<Cocktail> {
  console.log(`- ${file}`);
  const content = (await fs.readFile(path.join(cocktailsDir, file))).toString();

  const name = file.substring(0, file.lastIndexOf('.'));

  // The ingredients are a list in the first paragraph.
  const ingredients = content.split('\n\n')[0].trim()
    .split('\n')
    .map(processIngredient);

  // The description is the rest of the content.
  const description = content.substring(content.indexOf('\n\n')).trim();

  return {name, ingredients, description};
}

function processIngredient(line: string): Ingredient {
  if (!line.startsWith('- ')) {
    throw new Error(`Ingredient must start with "- ": ${line}`);
  }

  const parts = line.substring(2).split(' ');

  const amount = Number(parts[0]);
  if (isNaN(amount)) {
    throw new Error(`Ingredient amount must be a number: ${line}`);
  }

  const unit = unitMapping[parts[1]] ?? parts[1];
  if (!isUnit(unit)) {
    throw new Error(`Ingredient unit is not valid: ${line}`);
  }

  const name = parts.slice(2).join(' ');

  return {amount, unit, name};
}
