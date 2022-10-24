const router = require("express").Router();
// Import the custom middleware
const withAuth = require("../utils/auth");
const MyProfileData = require("../models/MyProfileData");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/login", async (req, res) => {
  try {
    res.render("login", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/myProfile", async (req, res) => {
  try {
    const myProfileData = await MyProfileData.findAll({});
    
    res.render("MyProfile", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;
