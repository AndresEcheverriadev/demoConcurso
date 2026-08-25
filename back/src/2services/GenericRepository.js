class GenericRepository {
  constructor(dao, model) {
    this.dao = dao;
    this.model = model;
  }

  getAll = async (params) => {
    return this.dao.getAll(params, this.model);
  };

  getOne = async (params) => {
    return this.dao.getOne(params, this.model);
  };

  getUser = async (params) => {
    return this.dao.getUser(params, this.model);
  };

  save = async (data) => {
    return this.dao.save(data, this.model);
  };

  updateOne = async (params) => {
    return this.dao.updateOne(params, this.model);
  };

  deleteOne = async (params) => {
    return this.dao.deleteOne(params, this.model);
  };
}

export default GenericRepository;
