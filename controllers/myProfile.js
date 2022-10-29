const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    cb(null, `index-${req.session.username}.JPG`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("myImage");

router.get("/", async (req, res) => {
  try {
    const userData = {
      email: req.session.email,
      first_name: req.session.first_name,
      last_name: req.session.last_name,
      username: req.session.username,
      weight: req.session.weight,
      height: req.session.height,
      age: req.session.age,
    };
    // const
    // fs.writeFileSync(path.join(__dirname)`index-${username}.JPG`);
    res.render("myProfile", { userData, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", upload, (req, res) => {
  const userData = {
    email: req.session.email,
    first_name: req.session.first_name,
    last_name: req.session.last_name,
    username: req.session.username,
    weight: req.session.weight,
    height: req.session.height,
    age: req.session.age,
  };
  console.log(req.file);
  res.render("myProfile", {
    loggedIn: req.session.loggedIn,
    userData,
    fileName: req.file.filename,
  });
});

module.exports = router;
