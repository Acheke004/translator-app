const util = require("util");
const multer = require("multer");
const uniqid = require("uniqid");
const path = require("path");
const fs = require("fs");

let uniqId = "";
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const condintion = false;
    let filename = file.originalname;
    uniqId = uniqid.time();
    filename = filename.split(".")[0];
    let dirname = path.resolve(path.resolve() + `/temp/${filename}/`);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }
    cb(null, dirname);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

let uploadFile = multer({
  storage: storage,
}).single("myfile");
let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
