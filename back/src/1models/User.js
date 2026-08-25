import mongoose from "mongoose";
const { Schema } = mongoose;

class User {
  static get collection() {
    return "users";
  }

  static get schema() {
    return {
      userName: { type: String, maxLength: 50 },
      password: { type: String, maxLength: 50 },
    };
  }
}

export default User;
