import { contestantService } from "../2services/index.js";
import { ServerResponse } from "../config/index.js";
import { __getTimestamp, __dirname } from "../../utils.js";
import * as path from "path";
import sendMail from "../2services/mailService.js";

const addContestant = async (req, res) => {
  let { nombre, rut, correo, telefono, comercio, correlativo } = req.body;
  let boleta = req.file.filename;
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
    let newContestant = {
      nombre: nombre,
      rut: rut,
      correo: correo,
      telefono: telefono,
      correlativo: correlativo,
      comercio: comercio,
      boleta: `/invoiceImages/${boleta}`,
    };

    // let existeRecord = await contestantService.getUser({
    //   correlativo: newContestant.correlativo,
    // });

    // if (existeRecord) {
    //   return ServerResponse.badRequest({
    //     res,
    //     error: "duplicado",
    //   });
    // } else {
    //   let response = await contestantService.save(newContestant);
    //   let mail = await sendMail(newContestant.correo);
    //   return ServerResponse.success({
    //     res,
    //   });
    // }

    let response = await contestantService.save(newContestant);
    let mail = await sendMail(newContestant.correo);
    return ServerResponse.success({
      res,
    });
  } catch (error) {
    ServerResponse.internalError({
      res,
    });
  }
};

export default {
  addContestant,
};
