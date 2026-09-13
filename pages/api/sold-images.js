// pages/api/sold-images.js
//
// Dedicated image source for the Sold page. Unlike /api/wallpaper-images
// (which serves the homepage hero carousel from wherever those wallpaper
// photos live), this endpoint reads ONLY from public/header — the folder
// that actually contains the 82 real sold-car photos — so the Sold page
// never picks up unrelated inventory/wallpaper images sitting elsewhere
// in public/.
import fs from 'fs';
import path from 'path';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

export default function handler(req, res) {
  const headerDir = path.join(process.cwd(), 'public', 'header');

  let files = [];
  try {
    files = fs.readdirSync(headerDir);
  } catch (err) {
    // Folder missing or unreadable — return an empty list rather than 500ing
    // the page, so the Sold page just shows "Loading..." instead of crashing.
    console.error('Could not read public/header:', err.message);
    return res.status(200).json([]);
  }

  const images = files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    // Natural sort (IMG_2 before IMG_10) so photos of the same car taken in
    // sequence stay grouped in the same order they were originally uploaded.
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/header/${file}`);

  res.status(200).json(images);
}