import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(__dirname, "..");
const srcCssFile = path.join(packageRoot, "src", "colors.css");
const distDir = path.join(packageRoot, "dist");
const distCssFile = path.join(distDir, "colors.css");

await mkdir(distDir, { recursive: true });
await cp(srcCssFile, distCssFile);