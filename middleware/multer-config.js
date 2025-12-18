const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require("path")

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = path.parse(file.originalname).name;
    const safeName = name.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${safeName}${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage }).single('image');

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return next(err);
    }

    if (!req.file) {
      return next();
    }

    const filePath = req.file.path;
    const tempPath = `${filePath}.tmp`;

    sharp(filePath)
      .resize(206, 260)
      .jpeg({ quality: 80 })
      .toFile(tempPath)
      .then(() => {
        fs.rename(tempPath, filePath, (fsErr) => {
          if (fsErr) {
            return next(fsErr);
          }
          next();
        });
      })
      .catch((error) => {
        next(error);
      });
  });
};
