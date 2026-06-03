import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const dir = path.join(process.cwd(), 'public', 'sold'); // or wallpaper ONLY

    const files = fs.readdirSync(dir);

    const images = files
      .filter((file) => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'))
      .map((file) => `/sold/${file}`); // IMPORTANT: match folder

    res.status(200).json(images);
  } catch (err) {
    res.status(500).json([]);
  }
}