// Downloads the site's photos and videos from Base44 into public/media.
// Files that already exist are skipped, so once you commit public/media
// to GitHub the site no longer depends on Base44 at all.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const outDir = join(root, 'public', 'media');
const media = JSON.parse(readFileSync(join(root, 'media.json'), 'utf8'));
mkdirSync(outDir, { recursive: true });

let failed = 0;
for (const { file, url } of media) {
  const dest = join(outDir, file);
  if (existsSync(dest)) { console.log(`skip  ${file}`); continue; }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`saved ${file}`);
  } catch (err) {
    failed++;
    console.warn(`FAILED ${file}: ${err.message}`);
  }
}
if (failed) console.warn(`${failed} file(s) could not be downloaded. The site will still build, but those images will be missing.`);
