const router = require("express").Router();
// Import the custom middleware
const withAuth = require("../utils/auth");
const ExercisesData = require("../models/ExercisesData");

router.get("/", withAuth, async (req, res) => {
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
    console.log(req.session);
    const exercisesData = await ExercisesData.findAll();
    const exercises = exercisesData.map((exercise) =>
      exercise.get({ plain: true })
    );
    res.render("homepage", {
      exercises,
      userData,
      loggedIn: req.session.loggedIn,
    });
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

module.exports = router;
