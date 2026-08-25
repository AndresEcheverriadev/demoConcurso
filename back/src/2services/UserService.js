import User from "../1models/User.js";
import GenericRepository from "./genericRepository.js";

class UserService extends GenericRepository {
  constructor(dao) {
    super(dao, User.collection);
  }
}

export default UserService;
