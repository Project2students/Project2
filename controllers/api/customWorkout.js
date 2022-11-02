const router = require("express").Router();
const CustomWorkout = require("../../models/CustomWorkout");

router.get("/:username", async (req, res) => {
  try {
    console.log(req.params.username);
    const customWorkout = await CustomWorkout.findAll({
      where: {
        username: req.params.username,
      },
    });
    res.status(200).json(customWorkout);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  const data = req.body;
  console.log(data);

  CustomWorkout.bulkCreate(data)
    .then((response) => {
      console.log("Data was posted successfully");
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/", (req, res) => {
  console.log("received Data");
  const data = req.body.data;
  console.log(data);

  CustomWorkout.destroy({
    where: {
      workout_id: req.body.data,
    },
  })
    .then((response) => {
      console.log("Data was posted successfully");
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
