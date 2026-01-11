import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(__dirname, "..");
const srcCssFile = path.join(packageRoot, "src", "tokens.tailwind.css");
const distDir = path.join(packageRoot, "dist");
const distCssFile = path.join(distDir, "tokens.tailwind.css");

await mkdir(distDir, { recursive: true });
await cp(srcCssFile, distCssFile);
