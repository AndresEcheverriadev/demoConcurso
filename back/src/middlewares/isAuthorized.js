import { ServerResponse } from "../config/serverResponses.js";
import jwt from "jsonwebtoken";

const isAuthorized = (req, res, next) => {
  // next();
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return ServerResponse.forbidden({
      res,
      error: "No Autorizado",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      return ServerResponse.forbidden({
        res,
        error: "No Autorizado",
      });
    } else {
      req.user = decoded;
      next();
    }
  });
};

export { isAuthorized };
