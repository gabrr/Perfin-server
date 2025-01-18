import multer from "multer";
import path from "path";
import { generateFileName } from "utils";

const uploadDir = process.env.UPLOAD_DIR || "uploads";

const storage = multer.diskStorage({
	destination: (_, file, cb) => {
		cb(null, uploadDir);
	},
	filename: (_, file, cb) => {
		cb(null, generateFileName(path, file));
	},
});

const uploader = multer({ storage: storage });

export default uploader;
