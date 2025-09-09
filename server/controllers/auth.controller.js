import bcrypt from "bcrypt";
import Joi from "joi";
import User from "../models/User.model.js";
import Session from "../models/Session.model.js";
import { ensureImage, rm } from "../utils/images.js";

const registerSchema = Joi.object({
  login: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(100).required(),
  phone: Joi.string().allow("", null),
});

export const register = async (req, res) => {
  try {
    if (registerSchema.validate(req.body).error)
      return res.status(400).send({ message: "Bad request" });

    const { login, password, phone } = req.body;
    if (await User.exists({ login }))
      return res.status(400).send({ message: "Login already in use" });

    const avatar = await ensureImage(req.file).catch((e) => {
      if (req.file) rm(req.file.path);
      throw e;
    });

    const user = await User.create({
      login,
      password: await bcrypt.hash(password, 10),
      phone,
      avatar,
    });

    res
      .status(201)
      .send({
        id: user._id,
        login: user.login,
        avatar: user.avatar,
        phone: user.phone,
      });
  } catch (e) {
    if (e.message === "WRONG_IMAGE")
      return res.status(400).send({ message: "Wrong image type" });
    res.status(400).send({ message: "Bad request" });
  }
};

export const login = async (req, res) => {
  const { login, password } = req.body || {};
  if (!(login && password))
    return res.status(400).send({ message: "Bad request" });

  const user = await User.findOne({ login });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ message: "Login or password incorrect" });

  req.session.user = { id: user._id.toString(), login: user.login };
  res.send({
    id: user._id,
    login: user.login,
    avatar: user.avatar,
    phone: user.phone,
  });
};

export const user = async (req, res) => {
  const sess = req.session?.user;
  if (!sess) return res.send(null);
  const u = await User.findById(sess.id).select("-password");
  res.send(u);
};

export const logout = async (req, res) => {
  if (process.env.NODE_ENV !== "production") await Session.deleteMany({});
  req.session.destroy(() => res.send({ ok: true }));
};
