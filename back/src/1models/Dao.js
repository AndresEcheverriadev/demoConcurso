import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Contestant from "./Contestant.js";
import User from "./User.js";
import ContestantWinner from "./Winner.js";

class Dao {
  constructor() {
    this.mongoose = mongoose
      .connect(`${process.env.MONGOURL}`, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      })
      .then(() => {
        console.log(`conectado a base de datos`);
      })
      .catch((err) => {
        console.log(err.message);
      });
    const timestamps = {
      timestamps: { createdAt: true, updatedAt: false },
    };

    const contestantSchema = mongoose.Schema(Contestant.schema, timestamps);
    const userSchema = mongoose.Schema(User.schema, timestamps);
    const winnerSchema = mongoose.Schema(ContestantWinner.schema, timestamps);

    this.models = {
      [Contestant.collection]: mongoose.model(
        Contestant.collection,
        contestantSchema
      ),
      [User.collection]: mongoose.model(User.collection, userSchema),
      [ContestantWinner.collection]: mongoose.model(
        ContestantWinner.collection,
        winnerSchema
      ),
    };
  }

  getAll = async (options, entity) => {
    if (!this.models[entity]) throw new Error(`La entidad no existe`);
    let result = await this.models[entity].find(options).lean();
    return result;
  };

  getOne = async (options, entity) => {
    if (!this.models[entity]) throw new Error(`La entidad no existe`);
    let result = await this.models[entity].findById(options).lean();
    return result;
  };

  getUser = async (options, entity) => {
    if (!this.models[entity]) throw new Error(`La entidad no existe`);
    let result = await this.models[entity].findOne(options).lean();
    return result;
  };

  save = async (document, entity) => {
    if (!this.models[entity]) throw new Error(`La entidad no existe`);
    let result = await this.models[entity].create(document);
    return result;
  };

  updateOne = async (options, entity) => {
    if (!this.models[entity]) throw new Error(`La entidad no existe`);
    let result = await this.models[entity]
      .findByIdAndUpdate(options.record, options.newvalues)
      .lean();
    return result;
  };

  deleteOne = async (options, entity) => {
    if (!this.models[entity]) throw new Error(`La entidad no existe`);
    let result = await this.models[entity].deleteOne({ _id: options }).lean();
    return result;
  };
}

export default Dao;
