import { ServerResponse } from "../config/serverResponses.js";
import jwt from "jsonwebtoken";

const isAuthorized = (req, res, next) => {
  next();
  // const token = req.headers["authorization"];
  // jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
  //   if (error) {
  //     console.log(token);
  //     console.log("no autorizado");
  //     return ServerResponse.forbidden({
  //       res,
  //       error: "No Autorizado",
  //     });
  //   } else {
  //     console.log("si autorizado");
  //     next();
  //   }
  // });
};

export { isAuthorized };
