const router = require("express").Router();

const userRoutes = require("./user-routes");
const exercisesData = require("./exercisesData");
const userPictures = require("./userPictures");
const customWorkout = require("./customWorkout");

router.use("/users", userRoutes);
router.use("/exercisesData", exercisesData);
router.use("/userPictures", userPictures);
router.use("/customWorkout", customWorkout);

module.exports = router;
