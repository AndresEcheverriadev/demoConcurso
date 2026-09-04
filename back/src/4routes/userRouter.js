import { Router } from "express";
import userController from "../3controllers/userController.js";
import { isAuthorized } from "../middlewares/isAuthorized.js";

const userRouter = Router();

userRouter.post("/auth", userController.authUser);
userRouter.get("/total", isAuthorized, userController.totalContestants);
userRouter.get("/all", isAuthorized, userController.allContestants);
userRouter.get(
  "/filtered/:criteria/:value",
  isAuthorized,
  userController.filteredContestants,
);
userRouter.get(
  "/total/:criteria/:value",
  isAuthorized,
  userController.filteredTotal,
);
userRouter.get(
  "/winner/:criteria/:value",
  isAuthorized,
  userController.filteredWinner,
);
userRouter.get(
  "/winners/consolidated",
  isAuthorized,
  userController.getConsolidatedWinners,
);
userRouter.post("/addWinner", isAuthorized, userController.addWinner);
userRouter.post("/deleteWinner", isAuthorized, userController.deleteWinner);
userRouter.get("/contestant/:id", isAuthorized, userController.oneContestant);
userRouter.delete(
  "/deleteContestant/:id",
  isAuthorized,
  userController.deleteContestant,
);

export default userRouter;
