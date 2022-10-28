const router = require("express").Router();
const CustomWorkout = require("../../models/CustomWorkout");

// CREATE new user
router.get("/", async (req, res) => {
  try {
    const customWorkout = await CustomWorkout.findAll({});
    res.status(200).json(customWorkout);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// router.post("/", async (req, res) => {
//   const data = JSON.stringify(req.body;
//   console.log(data);
//   try {
//     const customWorkout = await CustomWorkout.bulkCreate(data);
//     // if the dish is successfully created, the new response will be returned as json
//     res.status(200).json(customWorkout);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

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
module.exports = router;
