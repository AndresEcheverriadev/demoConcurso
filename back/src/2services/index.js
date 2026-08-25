import Dao from "../1models/Dao.js";
import ContestantService from "./ContestantService.js";
import UserService from "./UserService.js";
import WinnerService from "./WinnerService.js";

const dao = new Dao();

export const contestantService = new ContestantService(dao);
export const userService = new UserService(dao);
export const winnerService = new WinnerService(dao);
