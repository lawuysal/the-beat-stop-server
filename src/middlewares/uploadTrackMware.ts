import multer from "multer";
import path from "path";
import fs from "fs";
import { default as slugify } from "slugify";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.body.uploader;
    const uploadPath = path.join("dev-data/tracks", userId);

    fs.promises
      .access(uploadPath, fs.constants.F_OK)
      .then(() => cb(null, uploadPath))
      .catch(() => {
        fs.promises
          .mkdir(uploadPath, { recursive: true })
          .then(() => cb(null, uploadPath))
          .catch((err) =>
            cb(err, "An error occurred while creating the folder")
          );
      });
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const sluggifiedName = slugify(originalName, { lower: true });
    const ext = path.extname(originalName);
    const fileName = `${path.basename(
      sluggifiedName,
      ext
    )}-${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

const a = upload.single("fullTrack");

export default a;
