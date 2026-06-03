import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const dir = path.join(process.cwd(), "public/header");

    const files = fs.readdirSync(dir);

    const images = files
      .filter((file) =>
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg") ||
        file.endsWith(".png") ||
        file.endsWith(".webp") ||
        file.endsWith(".JPG") ||
        file.endsWith(".JPEG")
      )
      .map((file) => `/header/${file}`);

    res.status(200).json(images);
  } catch (err) {
    console.error("Image API error:", err);
    res.status(200).json([]);
  }
}