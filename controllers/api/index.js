const router = require("express").Router();

const userRoutes = require("./user-routes");
const exercisesData = require("./exercisesData");

const customWorkout = require("./customWorkout");

router.use("/users", userRoutes);
router.use("/exercisesData", exercisesData);

router.use("/customWorkout", customWorkout);

module.exports = router;
