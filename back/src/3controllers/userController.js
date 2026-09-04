import {
  userService,
  contestantService,
  winnerService,
} from "../2services/index.js";
import { ServerResponse, deleteFileService } from "../config/index.js";
import jwt from "jsonwebtoken";
import { __getTimestamp, __dirname } from "../../utils.js";
import * as path from "path";
import randomNumber from "../2services/randomService.js";

const authUser = async (req, res) => {
  let { userName, password } = req.body;
  if (!userName || !password) {
    return ServerResponse.badRequest({
      res,
      error: "Falta user",
    });
  }
  try {
    const record = await userService.getUser({
      userName: userName,
      password: password,
    });
    if (record) {
      let token = jwt.sign({ user: record.user }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      return ServerResponse.success({
        res,
        result: "User obtenido",
        data: token,
      });
    } else {
      return ServerResponse.badRequest({
        res,
        error: "No existe user",
      });
    }
  } catch (error) {
    return ServerResponse.internalError({
      res,
      error: "error interno en autenticación",
    });
  }
};

const allContestants = async (req, res) => {
  try {
    const contestants = await contestantService.getAll();
    return ServerResponse.success({
      res,
      result: "records obtenidos",
      data: contestants,
    });
  } catch (error) {
    ServerResponse.internalError({
      res,
      error: "error interno obteniendo records",
    });
  }
};

const totalContestants = async (req, res) => {
  try {
    const contestants = await contestantService.getAll();
    return ServerResponse.success({
      res,
      result: "records obtenidos",
      data: contestants.length,
    });
  } catch (error) {
    ServerResponse.internalError({
      res,
      error: "error interno obteniendo records",
    });
  }
};

const filteredContestants = async (req, res) => {
  let criteria = req.params.criteria;
  let value = req.params.value;
  const filtered = {};
  filtered[criteria] = value;
  try {
    const contestants = await contestantService.getAll(filtered);
    ServerResponse.success({
      res,
      result: "record obtenidos",
      data: contestants,
    });
  } catch (error) {
    ServerResponse.internalError({
      res,
      error: "error interno obteniendo records",
    });
  }
};

const filteredTotal = async (req, res) => {
  let criteria = req.params.criteria;
  let value = req.params.value;
  const filtered = {};
  filtered[criteria] = value;
  try {
    const contestants = await contestantService.getAll(filtered);
    ServerResponse.success({
      res,
      result: "records obtenidos",
      data: contestants.length,
    });
  } catch (error) {
    ServerResponse.internalError({
      res,
      error: "error interno obteniendo records",
    });
  }
};

const filteredWinner = async (req, res) => {
  let criteria = req.params.criteria;
  let value = req.params.value;
  const filtered = {};
  filtered[criteria] = value;
  try {
    const contestants = await contestantService.getAll(filtered);
    const randomRequest = await randomNumber(contestants.length - 1, value);
    const randomValue = randomRequest.result.random.data[0];
    const randomizedWinner = contestants[randomValue];
    ServerResponse.success({
      res,
      result: "record obtenido",
      data: randomizedWinner,
    });
  } catch (error) {
    ServerResponse.internalError({
      res,
      error: "error interno obteniendo records",
    });
  }
};

const getConsolidatedWinners = async (req, res) => {
  try {
    const contestants = await winnerService.getAll();
    return ServerResponse.success({
      res,
      result: "records obtenidos",
      data: contestants,
    });
  } catch (error) {
    ServerResponse.internalError({
      res,
      error: "error interno obteniendo records",
    });
  }
};

const addWinner = async (req, res) => {
  let { _id, nombre, rut, correo, telefono, comercio, correlativo, boleta } =
    req.body;
  if (
    !nombre ||
    !rut ||
    !correo ||
    !telefono ||
    !comercio ||
    !correlativo ||
    !boleta
  ) {
    return ServerResponse.badRequest({
      res,
    });
  }
  try {
    let newWinner = {
      id: _id,
      nombre: nombre,
      rut: rut,
      correo: correo,
      telefono: telefono,
      correlativo: correlativo,
      comercio: comercio,
      boleta: `/invoiceImages/${boleta}`,
    };
    let response = await winnerService.save(newWinner);
    ServerResponse.success({
      res,
    });
  } catch (error) {
    ServerResponse.internalError({
      res,
    });
  }
};

const deleteWinner = async (req, res) => {
  let { objectId } = req.body;
  if (!objectId) {
    return ServerResponse.badRequest({
      res,
      error: "Sin object id",
    });
  }
  try {
    let response = await winnerService.deleteOne(objectId);
    ServerResponse.success({
      res,
    });
  } catch (error) {
    ServerResponse.internalError({
      res,
    });
  }
};

const oneContestant = async (req, res) => {
  let contestant = req.params.id;
  const oneContestant = await contestantService.getOne({ _id: contestant });
  if (!contestant) {
    return ServerResponse.badRequest({
      res,
      error: "Sin id",
    });
  } else if (!oneContestant) {
    return ServerResponse.badRequest({
      res,
      error: "No existe record",
    });
  }
  try {
    const oneContestant = await contestantService.getOne({ _id: contestant });
    ServerResponse.success({
      res,
      result: "record obtenido",
      data: oneContestant,
    });
  } catch (error) {
    ServerResponse.internalError({
      res,
      error: "error interno obteniendo record",
    });
  }
};

const deleteContestant = async (req, res) => {
  let contestant = req.params.id;
  const oneContestant = await contestantService.getOne({ _id: contestant });
  if (!contestant) {
    return ServerResponse.badRequest({
      res,
      error: "Sin object id",
    });
  } else if (!oneContestant) {
    return ServerResponse.badRequest({
      res,
      error: "No existe record",
    });
  }
  try {
    let pathFile = path.join(
      __dirname,
      "../",
      `html/public/${oneContestant.boleta}`,
    );
    const deleteContestant = await contestantService.deleteOne({
      _id: contestant,
    });
    if (deleteContestant) {
      const deleteImageFile = deleteFileService(pathFile);
    } else {
      ServerResponse.internalError({
        res,
        error: "error interno borrar imagen de record",
      });
    }
    ServerResponse.success({
      res,
      result: "record borrado",
      data: deleteContestant,
    });
  } catch (error) {
    ServerResponse.internalError({
      res,
      error: "error interno borrando record",
    });
  }
};

export default {
  authUser,
  allContestants,
  totalContestants,
  filteredContestants,
  filteredTotal,
  filteredWinner,
  getConsolidatedWinners,
  addWinner,
  deleteWinner,
  oneContestant,
  deleteContestant,
};
