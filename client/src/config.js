export const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8000";

export const imgSrc = (path) =>
  process.env.NODE_ENV === "production" ? path : API_URL + path;
