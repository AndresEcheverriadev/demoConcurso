import { contestantService } from "../2services/index.js";
import { ServerResponse } from "../config/index.js";

const notDuplicated = async (req, res) => {
  let { correlativo } = req.body;
  let existeRecord = await contestantService.getUser({
    correlativo: correlativo,
  });
  if (existeRecord) {
    return true;
  }
};

export { notDuplicated };
