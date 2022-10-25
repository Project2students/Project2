const router = require("express").Router();
// Import the custom middleware
const withAuth = require("../utils/auth");

const { exercisesData } = require("../models/ExercisesData");
const ExercisesData = require("../models/ExercisesData");

const MyProfileData = require("../models/User");


router.get("/", withAuth, async (req, res) => {
  try {
    const exercisesData = await ExercisesData.findAll();
    const exercises = exercisesData.map((exercise) =>
      exercise.get({ plain: true })
    );
    console.log(exercises);
    res.render("homepage", { exercises, loggedIn: req.session.loggedIn });
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
