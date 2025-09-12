import { verifyUserToken } from "../utils/token.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

export function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return next();

  if (!authHeader.startsWith("Bearer"))
    return res
      .status(400)
      .json({ error: "Authorization header must start with Bearer" });

  //destructuring the bearer token - [bearer] [token]
  const [_, token] = authHeader.split(" ");

  const payload = verifyUserToken(token);

  req.user = payload;
  return next();
}

export function ensureAuthenticated(req, res, next) {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ error: "You are not authorized to access" });
  }
  return next();
}
