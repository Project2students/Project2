const router = require("express").Router();
// const multer = require();

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
    res.render("MyProfile", { userData, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
