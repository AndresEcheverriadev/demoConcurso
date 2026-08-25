import Contestant from "../1models/Contestant.js";
import GenericRepository from "./genericRepository.js";

class ContestantService extends GenericRepository {
  constructor(dao) {
    super(dao, Contestant.collection);
  }
}

export default ContestantService;
