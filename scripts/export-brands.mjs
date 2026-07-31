import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/brands");
const iconsDir = path.join(__dirname, "../node_modules/simple-icons/icons");

fs.mkdirSync(outDir, { recursive: true });

const fromSimpleIcons = [
  "ebay",
  "shopify",
  "tiktok",
  "meta",
  "google",
  "instagram",
  "facebook",
  "linkedin",
];

for (const slug of fromSimpleIcons) {
  const src = path.join(iconsDir, `${slug}.svg`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(outDir, `${slug}.svg`));
    console.log("copied", slug);
  } else {
    console.log("missing", slug);
  }
}

const custom = {
  "amazon.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 52" role="img" aria-label="Amazon">
  <text x="0" y="32" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#221F1F">amazon</text>
  <path fill="#FF9900" d="M3 37.5c26 12.5 52 14 78 9-1.8 2.8-4.5 4.8-7.5 6.2-10.5 5-22 7.5-33.5 7.5-15 0-27-4.5-34-10.5l-3-12.2z"/>
</svg>`,
  "walmart.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" role="img" aria-label="Walmart">
  <path fill="#0071CE" d="M30 6 36 24l18-1-14 11 5 16-19-13-19 13 5-16L7 23l18 1z"/>
  <text x="58" y="38" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="700" fill="#0071CE">Walmart</text>
</svg>`,
  "gohighlevel.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 60" role="img" aria-label="Go High Level">
  <rect x="0" y="8" width="280" height="44" rx="10" fill="#000"/>
  <text x="140" y="38" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="17" font-weight="700" fill="#fff">GoHighLevel</text>
</svg>`,
};

for (const [file, svg] of Object.entries(custom)) {
  fs.writeFileSync(path.join(outDir, file), svg);
  console.log("custom", file);
}
