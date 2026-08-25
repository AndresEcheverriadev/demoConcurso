import mongoose from "mongoose";
const { Schema } = mongoose;

class Contestant {
  static get collection() {
    return "contestants";
  }

  static get schema() {
    return {
      nombre: { type: String, maxLength: 100 },
      rut: { type: String, maxLength: 100 },
      correo: { type: String, maxLength: 100 },
      telefono: { type: String, maxLength: 100 },
      correlativo: { type: String, maxLength: 100 },
      comercio: { type: String, maxLength: 100 },
      boleta: { type: String, maxLength: 100 },
    };
  }
}

export default Contestant;
