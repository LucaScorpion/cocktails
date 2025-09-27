import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { type Cocktail, type Ingredient } from './src/model.ts';

const cocktailsDir = path.resolve(import.meta.dirname, 'cocktails');
const outFile = path.resolve(import.meta.dirname, 'src', 'cocktails.ts');

void (async () => {
  const files = await fs.readdir(cocktailsDir);

  // Variable name to code.
  const cocktailVars: [string, string][] = [];
  for (const file of files) {
    const cocktail = await processCocktail(file);
    cocktailVars.push([cocktail.id, generateCode(cocktail)]);
  }

  const code = `${cocktailVars.map(([, code]) => code).join('\n')}
  
export const cocktails = [
  ${cocktailVars.map(([name]) => name).join(',\n  ')}
];
`;

  await fs.writeFile(outFile, code);
})();

async function processCocktail(file: string): Promise<Cocktail> {
  console.log(`- ${file}`);
  const fileContent = (await fs.readFile(path.join(cocktailsDir, file))).toString();

  const id = file
    .substring(0, file.indexOf('.'))
    .replaceAll(' ', '_');

  // Get the front matter properties.
  const frontMatter: Record<string, string> = fileContent
    // Skip the front matter opening.
    .substring(3)
    .split('---\n')[0]
    .trim()
    // Process each line.
    .split('\n')
    .map((line) => line.trim().split(': '))
    // Add each property key and value to an object.
    .reduce((acc, [k, v]) => ({...acc, [k]: v}), {});

  if (!frontMatter.name) {
    throw new Error('Name missing from front matter');
  }

  // Get the content.
  const content = fileContent.substring(fileContent.indexOf('---\n', 3) + 4).trim();

  // The ingredients are a list in the first paragraph of the content.
  const ingredients = content.split('\n\n')[0].trim()
    .split('\n')
    .map(processIngredient);

  // The description is the rest of the content.
  const description = content.substring(content.indexOf('\n\n')).trim();

  return {
    id,
    name: frontMatter.name,
    ingredients,
    description
  };
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

  const unit = parts[1];

  const name = parts.slice(2).join(' ');

  return {amount, unit, name};
}

function generateCode(cocktail: Cocktail): string {
  return `const ${cocktail.id} = ${JSON.stringify(cocktail, null, 2)};`;
}
