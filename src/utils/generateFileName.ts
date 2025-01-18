import { PlatformPath } from "path";

export const generateFileName = (path: PlatformPath, file: Express.Multer.File) => {
	const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

	return `${file.fieldname}-${suffix}${path.extname(file.originalname)}`;
};
