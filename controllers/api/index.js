const router = require("express").Router();

const userRoutes = require("./user-routes");
const exercisesData = require("./exercisesData");
const userPictures = require("./userPictures");

router.use("/users", userRoutes);
router.use("/exercisesData", exercisesData);
router.use("/userPictures", userPictures);

module.exports = router;
