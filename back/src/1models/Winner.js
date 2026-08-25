import mongoose from "mongoose";
const { Schema } = mongoose;

class ContestantWinner {
  static get collection() {
    return "winners";
  }

  static get schema() {
    return {
      nombre: { type: String, maxLength: 100 },
      id: { type: String, maxLength: 100 },
      rut: { type: String, maxLength: 100 },
      correo: { type: String, maxLength: 100 },
      telefono: { type: String, maxLength: 100 },
      correlativo: { type: String, maxLength: 100 },
      comercio: { type: String, maxLength: 100 },
      boleta: { type: String, maxLength: 100 },
    };
  }
}

export default ContestantWinner;
