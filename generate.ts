import * as fs from 'node:fs/promises';
import * as path from 'node:path';

void (async () => {
  const cocktailsDir = path.resolve(import.meta.dirname, 'cocktails');
  const files = await fs.readdir(cocktailsDir);

  for (const file of files) {
    await processCocktail(file);
  }
})();

function processCocktail(file: string): Promise<void> {
  console.log(`- ${file}`);
}
