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

router.post("/", (req, res) => {
  const data = req.body;
  console.log(data);
  console.log(JSON.stringify(data));
  ExercisesData.bulkCreate(data)
    .then((response) => {
      console.log("Data was posted successfully");
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
