import fg from "fast-glob";
import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const execFileAsync = promisify(execFile);

/**
 * ========================================
 * 🖼️ KAMVEK Image Optimizer (Web-Ready)
 * ========================================
 *
 * Делает "профессиональную" веб-оптимизацию (не ретушь):
 * - HEIC/HEIF -> JPG (через macOS `sips`)
 * - Учитывает ориентацию (rotate по EXIF)
 * - Resize до MAX_WIDTH (по умолчанию 1920px)
 * - Сжатие JPG (mozjpeg)
 * - Перекодирование убирает метаданные (EXIF), уменьшая вес
 *
 * ОРИГИНАЛЫ НЕ ТРОГАЕМ: результат пишем в OUTPUT_DIR.
 *
 * Запуск:
 *   npm run images:optimize
 *
 * Env overrides (опционально):
 *   INPUT_DIR="фото работ"
 *   OUTPUT_DIR="public/images/portfolio/all"
 *   MAX_WIDTH=1920
 *   JPEG_QUALITY=78
 *   SKIP_EXISTING=1
 *   MAKE_WEBP=0
 *   WEBP_QUALITY=78
 */

const INPUT_DIR = process.env.INPUT_DIR || "фото работ";
const OUTPUT_DIR = process.env.OUTPUT_DIR || "public/images/portfolio/all";
const MAX_WIDTH = Number(process.env.MAX_WIDTH || 1920);
const JPEG_QUALITY = Number(process.env.JPEG_QUALITY || 78);
const SKIP_EXISTING = (process.env.SKIP_EXISTING || "1") !== "0";
const MAKE_WEBP = (process.env.MAKE_WEBP || "0") === "1";
const WEBP_QUALITY = Number(process.env.WEBP_QUALITY || 78);

function isHeic(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ext === ".heic" || ext === ".heif";
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function makeStableName(absPath) {
  // Имя строим от относительного пути внутри INPUT_DIR, чтобы не было коллизий.
  // "sub/IMG 0001.HEIC" -> "sub__img-0001"
  const rel = path.relative(path.resolve(INPUT_DIR), absPath);
  const noExt = rel.replace(path.extname(rel), "");
  return noExt
    .trim()
    .replace(/[\\/]+/g, "__")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9а-яА-Я_-]/g, "")
    .toLowerCase();
}

async function convertHeicToJpeg(inputPath, tempJpegPath) {
  // execFile (без shell) — безопасно для пробелов/кириллицы
  await execFileAsync("sips", ["-s", "format", "jpeg", inputPath, "--out", tempJpegPath], {
    maxBuffer: 1024 * 1024 * 50,
  });
}

async function processOne(inputFileAbs) {
  const base = makeStableName(inputFileAbs);
  const outJpg = path.join(OUTPUT_DIR, `${base}.jpg`);
  const outWebp = path.join(OUTPUT_DIR, `${base}.webp`);

  if (SKIP_EXISTING && (await fileExists(outJpg))) {
    return { status: "skipped", out: outJpg };
  }

  let sourceForSharp = inputFileAbs;
  let tempFile = null;

  if (isHeic(inputFileAbs)) {
    tempFile = path.join(OUTPUT_DIR, `${base}.__temp.jpg`);
    await convertHeicToJpeg(inputFileAbs, tempFile);
    sourceForSharp = tempFile;
  }

  let img = sharp(sourceForSharp, { failOn: "none" }).rotate();
  const meta = await img.metadata();

  if (meta.width && meta.width > MAX_WIDTH) {
    img = img.resize({ width: MAX_WIDTH });
  }

  await img
    .jpeg({
      quality: JPEG_QUALITY,
      mozjpeg: true,
      chromaSubsampling: "4:2:0",
    })
    .toFile(outJpg);

  if (MAKE_WEBP) {
    let webpImg = sharp(sourceForSharp, { failOn: "none" }).rotate();
    const webpMeta = await webpImg.metadata();
    if (webpMeta.width && webpMeta.width > MAX_WIDTH) {
      webpImg = webpImg.resize({ width: MAX_WIDTH });
    }
    await webpImg.webp({ quality: WEBP_QUALITY }).toFile(outWebp);
  }

  if (tempFile) {
    await fs.unlink(tempFile).catch(() => {});
  }

  return { status: "ok", out: outJpg };
}

async function main() {
  await ensureDir(OUTPUT_DIR);

  const pattern = `${INPUT_DIR}/**/*.{jpg,JPG,jpeg,JPEG,png,PNG,heic,HEIC,heif,HEIF}`;
  const filesRel = await fg([pattern], { onlyFiles: true, dot: false });
  const filesAbs = filesRel.map((p) => path.resolve(p));

  console.log(
    `Found ${filesAbs.length} files in "${INPUT_DIR}". Output -> "${OUTPUT_DIR}" (maxWidth=${MAX_WIDTH}, quality=${JPEG_QUALITY})`
  );
  if (filesAbs.length === 0) {
    console.log("Nothing to do.");
    return;
  }

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const f of filesAbs) {
    try {
      const res = await processOne(f);
      if (res.status === "ok") ok += 1;
      if (res.status === "skipped") skipped += 1;
      const done = ok + skipped + failed;
      if (done % 25 === 0) console.log(`Progress: ${done}/${filesAbs.length}`);
    } catch (e) {
      failed += 1;
      console.error(`✗ Failed: ${path.basename(f)}`);
      console.error(e?.message || e);
    }
  }

  console.log(`Done. ok=${ok}, skipped=${skipped}, failed=${failed}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

