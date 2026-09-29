import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getLogoPath = () => {
  return path.join(__dirname, "../../assets/logo_vk.png");
};

const ensureDirectoryExists = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, {
      recursive: true,
    });
  }
};

const formatDate = (date = new Date()) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatFileName = (
  modelName = "product"
) => {
  return modelName
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
};

const getContentBottom = (doc) => {
  return doc.page.height - 75;
};

const hasEnoughSpace = (
  currentY,
  requiredHeight,
  doc
) => {
  const bottom = getContentBottom(doc);

  return (
    currentY + requiredHeight <= bottom
  );
};

export {
  getLogoPath,
  ensureDirectoryExists,
  formatDate,
  formatFileName,
  getContentBottom,
  hasEnoughSpace,
};