import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const publicDir = path.join(process.cwd(), "public");

  const files = fs
    .readdirSync(publicDir)
    .filter((file) => file.toLowerCase().endsWith(".jpg"))
    .map((file) => `/${file}`);

  res.status(200).json(files);
}