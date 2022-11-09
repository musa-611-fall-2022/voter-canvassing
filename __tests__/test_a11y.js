/* globals expect, describe, it */

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFile } from 'node:fs/promises';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('the index.html page', () => {
  it('should not have any obvious accessibility violations', async () => {
    const indexPath = `${__dirname}/../site/index.html`;
    const html = await readFile(indexPath, { encoding: 'utf8' });

    expect(await axe(html)).toHaveNoViolations();
  });
});