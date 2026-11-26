import subsetFont from 'subset-font';
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

async function walk(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'fonts') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path, acc);
    else if (/\.(astro|ts|css|mjs|svg|txt|webmanifest|html|md)$/.test(entry.name)) acc.push(path);
  }
  return acc;
}

const files = [...(await walk('src')), ...(await walk('scripts')), ...(await walk('public'))];
let text = '';
for (const file of files) text += `\n${await readFile(file, 'utf8')}`;
text += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
text += '，。、；：？！「」『』《》〈〉（）【】〔〕—…·・～％“”‘’：∶、‧•–—―×＋＝©';

const chars = [...new Set(text)].join('');
await mkdir('public/fonts', { recursive: true });
await mkdir('tmp', { recursive: true });

const jobs = [
  [
    'node_modules/@fontsource/noto-serif-sc/files/noto-serif-sc-chinese-simplified-600-normal.woff2',
    'noto-serif-sc-600.woff2',
    'tmp/noto-serif-sc-600.ttf',
  ],
  [
    'node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-400-normal.woff2',
    'noto-sans-sc-400.woff2',
    'tmp/noto-sans-sc-400.ttf',
  ],
  [
    'node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-500-normal.woff2',
    'noto-sans-sc-500.woff2',
    null,
  ],
];

for (const [src, woff2Name, ttfName] of jobs) {
  const buffer = await readFile(src);
  const woff2 = await subsetFont(buffer, chars, { targetFormat: 'woff2' });
  await writeFile(join('public/fonts', woff2Name), woff2);
  console.log(`${woff2Name} ${Math.round(woff2.length / 1024)}KB`);
  if (ttfName) {
    const ttf = await subsetFont(buffer, chars, { targetFormat: 'truetype' });
    await writeFile(ttfName, ttf);
  }
}

const latin = [
  [
    'node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2',
    'instrument-serif-400.woff2',
  ],
  [
    'node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2',
    'instrument-serif-400-italic.woff2',
  ],
  ['node_modules/@fontsource/outfit/files/outfit-latin-400-normal.woff2', 'outfit-400.woff2'],
  ['node_modules/@fontsource/outfit/files/outfit-latin-500-normal.woff2', 'outfit-500.woff2'],
];

for (const [src, name] of latin) {
  await copyFile(src, join('public/fonts', name));
}

await copyFile('node_modules/@fontsource/noto-serif-sc/LICENSE', 'public/fonts/OFL.txt');
console.log(`subset characters ${chars.length}`);
