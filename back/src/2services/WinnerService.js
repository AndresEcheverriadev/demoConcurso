import ContestantWinner from "../1models/Winner.js";
import GenericRepository from "./GenericRepository.js";

class WinnerService extends GenericRepository {
  constructor(dao) {
    super(dao, ContestantWinner.collection);
  }
}

export default WinnerService;
