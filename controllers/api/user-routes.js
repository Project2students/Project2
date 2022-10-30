const router = require("express").Router();
const User = require("../../models/User");

// CREATE new user
router.post("/", async (req, res) => {
  console.log("posting new user", req.body)
  try {
    const dbUserData = await User.create(req.body);

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = dbUserData.username;
      req.session.email = dbUserData.email;
      req.session.first_name = dbUserData.first_name;
      req.session.last_name = dbUserData.last_name;
      req.session.weight = dbUserData.weight;
      req.session.height = dbUserData.height;
      req.session.age = dbUserData.age;

      // const username = req.session.username;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({});
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  console.log("Logout Requested");
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
    res.redirect("/");
  } else {
    res.status(404).end();
  }
});

module.exports = router;
