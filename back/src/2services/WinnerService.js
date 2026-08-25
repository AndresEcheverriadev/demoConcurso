import ContestantWinner from "../1models/Winner.js";
import GenericRepository from "./genericRepository.js";

class WinnerService extends GenericRepository {
  constructor(dao) {
    super(dao, ContestantWinner.collection);
  }
}

export default WinnerService;
