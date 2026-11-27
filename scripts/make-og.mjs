import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const font = {
  fontFiles: ['tmp/noto-serif-sc-600.ttf', 'tmp/noto-sans-sc-400.ttf'],
  loadSystemFonts: false,
  defaultFontFamily: 'Noto Serif SC',
};

function render(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font,
  });
  return resvg.render().asPng();
}

const og = render(
  `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0c0b0a"/>
  <rect x="72" y="72" width="2" height="486" fill="#c6a36b"/>
  <text x="108" y="250" fill="#f3efe6" font-family="Noto Serif SC" font-size="120" font-weight="600">谢兆明</text>
  <text x="112" y="312" fill="#c2baae" font-family="Noto Sans SC" font-size="22" font-weight="400">创意总监</text>
  <text x="112" y="470" fill="#c2baae" font-family="Noto Sans SC" font-size="28">以影像与视觉系统，</text>
  <text x="112" y="518" fill="#c2baae" font-family="Noto Sans SC" font-size="28">把一场战役从概念做到可被触碰的接触点。</text>
</svg>`,
  1200,
);

await sharp(og).jpeg({ quality: 82, mozjpeg: true }).toFile('public/og.jpg');

const icon = render(
  `<?xml version="1.0" encoding="UTF-8"?>
<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="#0c0b0a"/>
  <rect x="28" y="32" width="4" height="116" fill="#c6a36b"/>
  <text x="104" y="118" text-anchor="middle" fill="#f3efe6" font-family="Noto Serif SC" font-size="92" font-weight="600">谢</text>
</svg>`,
  180,
);

await writeFile('public/apple-touch.png', icon);
console.log('wrote public/og.jpg and public/apple-touch.png');
