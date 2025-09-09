import path from "path";
import fs from "fs";
import Joi from "joi";
import { fileURLToPath } from "url";
import Ad from "../models/Ad.model.js";
import { ensureImage, rm } from "../utils/images.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adSchema = Joi.object({
  title: Joi.string().min(10).max(50).required(),
  content: Joi.string().min(20).max(1000).required(),
  price: Joi.number().min(0).required(),
  location: Joi.string().min(2).max(100).required(),
});

const SELLER_FIELDS = "login avatar phone";

export const getAll = async (_req, res) => {
  const ads = await Ad.find()
    .sort({ createdAt: -1 })
    .populate("seller", SELLER_FIELDS);
  res.send(ads);
};

export const getOne = async (req, res) => {
  const ad = await Ad.findById(req.params.id).populate("seller", SELLER_FIELDS);
  return ad ? res.send(ad) : res.status(404).send({ message: "Not found" });
};

export const search = async (req, res) => {
  const q = new RegExp(req.params.searchPhrase ?? "", "i");
  const ads = await Ad.find({ title: q })
    .sort({ createdAt: -1 })
    .select("title photo location price");
  res.send(ads);
};

export const create = async (req, res) => {
  try {
    if (adSchema.validate(req.body).error)
      return res.status(400).send({ message: "Bad request" });

    const photo = await ensureImage(req.file, { required: true });

    const ad = await Ad.create({
      ...req.body,
      seller: req.session.user.id,
      photo,
      date: new Date(),
    });

    res.status(201).send(await ad.populate("seller", SELLER_FIELDS));
  } catch (e) {
    if (req.file) rm(req.file.path);
    if (e.message === "PHOTO_REQUIRED")
      return res.status(400).send({ message: "Photo required" });
    if (e.message === "WRONG_IMAGE")
      return res.status(400).send({ message: "Wrong image type" });
    res.status(400).send({ message: "Bad request" });
  }
};

export const update = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).send({ message: "Not found" });
    if (ad.seller.toString() !== req.session.user.id)
      return res.status(403).send({ message: "Forbidden" });

    if (adSchema.validate(req.body).error)
      return res.status(400).send({ message: "Bad request" });

    let newPhotoPath = null;
    if (req.file) newPhotoPath = await ensureImage(req.file);

    const oldFsPath = ad.photo
      ? path.join(__dirname, "../public", ad.photo)
      : null;

    ad.set({ ...req.body, ...(newPhotoPath ? { photo: newPhotoPath } : {}) });
    await ad.save();

    if (newPhotoPath && oldFsPath) rm(oldFsPath);
    res.send(await ad.populate("seller", SELLER_FIELDS));
  } catch (e) {
    if (req.file) rm(req.file.path);
    if (e.message === "WRONG_IMAGE")
      return res.status(400).send({ message: "Wrong image type" });
    res.status(400).send({ message: "Bad request" });
  }
};

export const remove = async (req, res) => {
  const ad = await Ad.findById(req.params.id);
  if (!ad) return res.status(404).send({ message: "Not found" });
  if (ad.seller.toString() !== req.session.user.id)
    return res.status(403).send({ message: "Forbidden" });

  await ad.deleteOne();
  if (ad.photo) rm(path.join(__dirname, "../public", ad.photo));
  res.send({ ok: true });
};
