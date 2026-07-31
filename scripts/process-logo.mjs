import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, "../public/logo-source.png");
const output = path.join(__dirname, "../public/logo.png");

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  const whiteness = Math.min(r, g, b);
  const spread = Math.max(r, g, b) - whiteness;

  if (whiteness >= 240 && spread <= 18) {
    data[i + 3] = 0;
  } else if (whiteness >= 220 && spread <= 25) {
    data[i + 3] = Math.round(((240 - whiteness) / 20) * 255);
  }
}

const meta = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 5 })
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log(JSON.stringify(meta));
