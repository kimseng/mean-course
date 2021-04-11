const multer = require("multer");

const fileTypes = /jpeg|jpg|png|gif/;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //const isValid = MINE_TYPE_MAP[file.minetype];
    const isValid = fileTypes.test(file.mimetype);
    console.log("Image extension type is =>" + isValid);

    let error = new Error("Invalid mine type");
    if (isValid) {
      error = null;
    }
    //cb(error, "backend/images");  //For Dev
    cb(error, process.env.IMG_PATH); //For Prod
    ///Users/kimseng/Documents/mydev/nodejs/mean-course/src/
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    //const ext = MINE_TYPE_MAP[file.minetype];
    //const ext = fileTypes.test(file.path.extname(file.originalname));
    const ext = file.mimetype.split("/")[1];
    console.log("Image extension is =>" + ext);
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});
module.exports = multer({ storage: storage }).single("image");
