import path from "path";
import fs from "fs";
import getImageFileType from "./getImageFileType.js";

const OK = new Set(["image/png", "image/jpeg", "image/gif"]);

export const ensureImage = async (file, { required = false } = {}) => {
  if (!file) {
    if (required) throw new Error("PHOTO_REQUIRED");
    return null;
  }
  const mime = await getImageFileType(file);
  if (!OK.has(mime)) throw new Error("WRONG_IMAGE");
  return "/uploads/" + path.basename(file.path);
};

export const rm = (fsPath) => {
  try {
    if (fsPath) fs.unlinkSync(fsPath);
  } catch {}
};
