import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dir = path.join(process.cwd(), 'public/wallpaper');

  const files = fs.readdirSync(dir);

  const images = files
    .filter((f) =>
      f.endsWith('.jpg') ||
      f.endsWith('.jpeg') ||
      f.endsWith('.png') ||
      f.endsWith('.webp')
    )
    .map((f) => `/wallpaper/${f}`);

  res.status(200).json(images);
}