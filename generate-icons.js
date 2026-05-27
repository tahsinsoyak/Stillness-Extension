import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateIcons() {
  const sizes = [16, 32, 48, 128];
  const outDir = path.join(__dirname, 'public', 'icons');
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const size of sizes) {
    // Create a new image with a light calm accent color (#14B8A6)
    const image = new Jimp({ width: size, height: size, color: 0x14B8A6FF });
    
    // Draw a simple pause symbol (two white rectangles)
    const rectWidth = Math.max(2, Math.floor(size * 0.15));
    const rectHeight = Math.max(6, Math.floor(size * 0.5));
    const gap = Math.max(2, Math.floor(size * 0.15));
    
    const startX1 = Math.floor(size / 2) - rectWidth - Math.floor(gap / 2);
    const startX2 = Math.floor(size / 2) + Math.floor(gap / 2);
    const startY = Math.floor((size - rectHeight) / 2);
    
    for (let x = 0; x < rectWidth; x++) {
      for (let y = 0; y < rectHeight; y++) {
        image.setPixelColor(0xFFFFFFFF, startX1 + x, startY + y);
        image.setPixelColor(0xFFFFFFFF, startX2 + x, startY + y);
      }
    }
    
    await image.write(path.join(outDir, `icon${size}.png`));
    console.log(`Generated icon${size}.png`);
  }
}

generateIcons().catch(console.error);
