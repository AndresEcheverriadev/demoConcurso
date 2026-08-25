import * as fs from "fs";

const deleteFileService = (file) => {
  fs.unlinkSync(`${file}`);
};

export { deleteFileService };
