const router = require("express").Router();
// Import the custom middleware
const withAuth = require("../utils/auth");
const ExercisesData = require("../models/ExercisesData");
const CustomWorkout = require("../models/CustomWorkout");

const MyProfileData = require("../models/User");

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
    const exercisesData = await ExercisesData.findAll({});

    const exercises = exercisesData.map((exercise) =>
      exercise.get({ plain: true })
    );
    console.log(exercises);
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

// router.get("/myProfile", async (req, res) => {
//   try {
//     const myProfileData = await MyProfileData.findAll();
//     const users = myProfileData.map((users) =>
//       users.get({ plain: true })

//     );
//     console.log(users)
//     res.render("myProfile", { users , loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get("/workoutPage/:username", async (req, res) => {
  console.log(req.params.username);

  try {
    let results = [];
    const customWorkoutData = await CustomWorkout.findAll({
      where: {
        username: req.params.username,
      },
    });
    // const myProfileData = await MyProfileData.findAll();
    // const users = myProfileData.map((users) => users.get({ plain: true }));
    const customWorkout = customWorkoutData.map((workout) =>
      workout.get({ plain: true })
    );
    const wokroutId = [...new Set(customWorkout.map((el) => el.workout_id))];
    for (let i = 0; i < wokroutId.length; i++) {
      const workouts = customWorkout.filter(
        (el) => el.workout_id == wokroutId[i]
      );
      results.push(workouts);
    }
    console.log(results);
    res.render("workoutPage", {
      // users,
      results,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
