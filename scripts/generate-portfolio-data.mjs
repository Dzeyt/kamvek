import fg from "fast-glob";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * Генератор данных портфолио.
 *
 * Берёт все изображения из public/images/portfolio/all
 * и создаёт src/data/portfolio.ts
 *
 * Идея: сначала получаем рабочую галерею на всех фото,
 * потом постепенно проставляем категории (ручками) — без спешки.
 */

const IMAGES_DIR = "public/images/portfolio/all";
const OUT_FILE = "src/data/portfolio.ts";

function makeIdFromFilename(filename) {
  return filename.replace(/\.[^.]+$/, "");
}

async function main() {
  const pattern = `${IMAGES_DIR}/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}`;
  const filesRel = await fg([pattern], { onlyFiles: true, dot: false });

  const files = filesRel
    .map((p) => p.replaceAll("\\", "/"))
    .sort((a, b) => a.localeCompare(b, "ru"));

  const items = files.map((relPath) => {
    const file = path.basename(relPath);
    return {
      id: makeIdFromFilename(file),
      src: "/" + relPath.replace(/^public\//, ""),
      categories: ["Без категории"],
    };
  });

  const content =
    `/* eslint-disable */\n` +
    `// Этот файл сгенерирован скриптом scripts/generate-portfolio-data.mjs\n` +
    `// Если нужно перегенерировать: npm run portfolio:generate\n` +
    `\n` +
    `export type PortfolioCategory =\n` +
    `  | "Все"\n` +
    `  | "Без категории"\n` +
    `  | "Столешницы"\n` +
    `  | "Лестницы и ступени"\n` +
    `  | "Камины"\n` +
    `  | "Ванные и санузлы"\n` +
    `  | "Входные группы"\n` +
    `  | "Барбекю"\n` +
    `  | "Ресепшен и коммерция"\n` +
    `  | "Облицовка"\n` +
    `  | "Социально значимые объекты";\n` +
    `\n` +
    `export type PortfolioItem = {\n` +
    `  id: string;\n` +
    `  src: string;\n` +
    `  categories: PortfolioCategory[];\n` +
    `  // optional: подпись/материал — можно добавить позже\n` +
    `  title?: string;\n` +
    `  material?: string;\n` +
    `};\n` +
    `\n` +
    `export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [\n` +
    `  "Все",\n` +
    `  "Столешницы",\n` +
    `  "Лестницы и ступени",\n` +
    `  "Камины",\n` +
    `  "Ванные и санузлы",\n` +
    `  "Входные группы",\n` +
    `  "Барбекю",\n` +
    `  "Ресепшен и коммерция",\n` +
    `  "Облицовка",\n` +
    `  "Социально значимые объекты",\n` +
    `  "Без категории",\n` +
    `];\n` +
    `\n` +
    `export const PORTFOLIO_ITEMS: PortfolioItem[] = ${JSON.stringify(items, null, 2)};\n`;

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, content, "utf8");

  console.log(`Generated ${OUT_FILE} with ${items.length} items`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

