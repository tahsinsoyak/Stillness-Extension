import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateIcons() {
  const sizes = [16, 32, 48, 128];
  const sourcePath = path.join(__dirname, 'assets', 'zen-ripple-wave.png');
  const outDir = path.join(__dirname, 'public', 'icons');
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source image not found at ${sourcePath}`);
  }

  console.log(`Reading source icon from: ${sourcePath}`);

  for (const size of sizes) {
    const image = await Jimp.read(sourcePath);
    image.resize({ w: size, h: size });
    
    const outputPath = path.join(outDir, `icon${size}.png`);
    await image.write(outputPath);
    console.log(`Generated icon${size}.png (${size}x${size})`);
  }
}

generateIcons().catch(console.error);
