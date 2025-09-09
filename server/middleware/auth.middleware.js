import Session from "../models/Session.model.js";

const auth = async (req, res, next) => {
  if (req.session?.user) return next();

  if (process.env.NODE_ENV !== "production") {
    try {
      const last = await Session.findOne({}).sort({ expires: -1 });
      const data = last ? JSON.parse(last.session) : null;
      if (data?.user) {
        req.session.user = { id: data.user.id, login: data.user.login };
        return next();
      }
    } catch {}
  }
  res.status(401).send({ message: "You are not authorized" });
};

export default auth;
