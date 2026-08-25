import { Router } from "express";
import userController from "../3controllers/userController.js";

const userRouter = Router();

userRouter.post("/auth", userController.authUser);
userRouter.get("/total", userController.totalContestants);
userRouter.get("/all", userController.allContestants);
userRouter.get(
  "/filtered/:criteria/:value",
  userController.filteredContestants
);
userRouter.get("/total/:criteria/:value", userController.filteredTotal);
userRouter.get("/winner/:criteria/:value", userController.filteredWinner);
userRouter.get("/winners/consolidated", userController.getConsolidatedWinners);
userRouter.post("/addWinner", userController.addWinner);
userRouter.post("/eraseWinner", userController.eraseWinner);
userRouter.get("/contestant/:id", userController.oneContestant);
userRouter.delete("/delete/:id", userController.deleteContestant);

export default userRouter;
