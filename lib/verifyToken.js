import jwt from "jsonwebtoken";

export const verifyToken = (req) => {
  const token = req.headers.get("authorization");

  if (!token) return null;

  try {
    return jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
};

