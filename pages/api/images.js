import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // ONLY target specific folder (VERY IMPORTANT)
    const folder = req.query.folder || 'sold';

    const allowedFolders = ['sold', 'header', 'wallpaper'];

    if (!allowedFolders.includes(folder)) {
      return res.status(400).json([]);
    }

    const dir = path.join(process.cwd(), 'public', folder);

    const files = fs.readdirSync(dir);

    const images = files
      .filter((file) =>
        file.endsWith('.jpg') ||
        file.endsWith('.jpeg') ||
        file.endsWith('.png') ||
        file.endsWith('.webp')
      )
      .map((file) => `/${folder}/${file}`);

    res.status(200).json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
}