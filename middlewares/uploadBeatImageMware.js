const path = require("path");
const fs = require("fs");
const slugify = require("slugify");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.body.owner;
    const fieldName = file.fieldname;
    let uploadPath = "";
    if (fieldName === "photo")
      uploadPath = path.join("dev-data/images/beat-images", userId);
    if (fieldName === "fullTrack")
      uploadPath = path.join("dev-data/tracks", userId);

    fs.promises
      .access(uploadPath, fs.constants.F_OK)
      .then(() => cb(null, uploadPath))
      .catch(() => {
        fs.promises
          .mkdir(uploadPath, { recursive: true })
          .then(() => cb(null, uploadPath))
          .catch((err) => cb(err, null));
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

module.exports = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "fullTrack", maxCount: 1 },
]);
