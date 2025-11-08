import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/s3.config";
import { v4 as uuidv4 } from "uuid";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME!,
    key: function (req, file, cb) {
      const fileExtension = file.originalname.split(".").pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      cb(null, `${fileName}`); // saves inside "products" folder
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
