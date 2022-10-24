const router = require("express").Router();
const ExercisesData = require("../../models/ExercisesData");

// CREATE new user
router.get("/", async (req, res) => {
  try {
    const exercisesData = await ExercisesData.findAll({});
    res.status(200).json(exercisesData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
