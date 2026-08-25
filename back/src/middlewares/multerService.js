import * as dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import * as path from "path";
import { __dirname } from "../../utils.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../", process.env.PATH_STORAGE_LOCAL));
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.nombreFile}.${file.mimetype.split("/")[1]}`);
  },
});

const uploadService = multer({
  storage: storage,
  fileFilter: async (req, file, cb) => {
    const acceptedExtensions = [".jpg", ".jpeg", ".png"];
    const fileExtension = path.extname(file.originalname);
    const isAnAcceptedExtension = acceptedExtensions.includes(fileExtension);
    if (isAnAcceptedExtension) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export { uploadService };
