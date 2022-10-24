const router = require("express").Router();

const userRoutes = require("./user-routes");
const exercisesData = require("./exercisesData");

router.use("/users", userRoutes);
router.use("/exercisesData", exercisesData);

module.exports = router;
