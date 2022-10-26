const router = require("express").Router();
const UserPictures = require("../../models/UserPictures");

router.post("/", async (req, res) => {
  try {
    const profilePicture = await UserPictures.create({
      picture_id: req.body.picture_id,
      user_id: req.body.user_id,
    });
    res.status(200).json(profilePicture);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
