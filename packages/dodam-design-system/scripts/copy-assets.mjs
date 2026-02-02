import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(__dirname, "..");
const srcDir = path.join(packageRoot, "src");
const distDir = path.join(packageRoot, "dist");

const cssFiles = [
  { src: "colors/colors.css", dest: "colors/colors.css" },
  { src: "shapes/tokens.tailwind.css", dest: "shapes/tokens.tailwind.css" },
  { src: "themes/theme.tailwind.css", dest: "themes/theme.tailwind.css" },
  { src: "typography/tokens.tailwind.css", dest: "typography/tokens.tailwind.css" },
];

for (const file of cssFiles) {
  const srcPath = path.join(srcDir, file.src);
  const destPath = path.join(distDir, file.dest);
  await mkdir(path.dirname(destPath), { recursive: true });
  await cp(srcPath, destPath);
}

// Copy icon assets (SVG files)
const assetDirs = [
  { src: "icons/illustration/assets", dest: "icons/illustration/assets" },
];

for (const dir of assetDirs) {
  const srcPath = path.join(srcDir, dir.src);
  const destPath = path.join(distDir, dir.dest);
  await mkdir(path.dirname(destPath), { recursive: true });
  await cp(srcPath, destPath, { recursive: true });
}
