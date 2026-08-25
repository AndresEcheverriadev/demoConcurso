import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import * as http from "http";
import * as https from "https";
import * as fs from "fs";
import { onAuthorizationHeaders } from "./middlewares/onAuthorizationHeaders.js";
import { notDuplicated } from "./middlewares/notDuplicated.js";
import { isAuthorized } from "./middlewares/isAuthorized.js";
import createContestantRouter from "./4routes/createContestantRouter.js";
import userRouter from "./4routes/userRouter.js";

const app = express();
const serverPort = process.env.PORT || 8085;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(onAuthorizationHeaders);
app.use("/", createContestantRouter);
app.use("/user", userRouter);

// http server

const httpServer = http.createServer(app);

httpServer.listen(serverPort, () => {
  console.log(`Servidor escuchando en puerto ${httpServer.address().port}`);
});

// https server

// const privateKey = fs.readFileSync(
//   "/etc/letsencrypt/live/veranosoftys.cl/privkey.pem",
//   "utf8"
// );
// const certificate = fs.readFileSync(
//   "/etc/letsencrypt/live/veranosoftys.cl/cert.pem",
//   "utf8"
// );
// const ca = fs.readFileSync(
//   "/etc/letsencrypt/live/veranosoftys.cl/chain.pem",
//   "utf8"
// );

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// };

// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(serverPort, () => {
//   console.log(
//     `Servidor HTTPS corriendo en puerto ${httpsServer.address().port}`
//   );
// });
