const router = require("express").Router();
// Import the custom middleware
const withAuth = require("../utils/auth");
const { exercisesData } = require("../models/ExercisesData");
const ExercisesData = require("../models/ExercisesData");

// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('homepage', {
//       users,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/", async (req, res) => {
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

module.exports = router;
