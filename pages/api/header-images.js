const fs = require("fs");
const path = require("path");

export default function handler(req, res) {
  const dir = path.join(process.cwd(), "public/header");

  const images = fs
    .readdirSync(dir)
    .filter((f) => f.match(/\.(jpg|jpeg|png|webp)$/i))
    .map((f) => `/header/${f}`);

  res.status(200).json(images);
}