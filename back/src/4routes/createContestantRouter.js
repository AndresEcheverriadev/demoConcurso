import { Router } from "express";
import contestantController from "../3controllers/contestantController.js";
import { uploadService } from "../middlewares/multerService.js";
import { notDuplicated } from "../middlewares/notDuplicated.js";

const createContestantRouter = Router();

createContestantRouter.post(
  "/addContestant",
  uploadService.single("inputImagen"),
  notDuplicated,
  contestantController.addContestant
);

export default createContestantRouter;
