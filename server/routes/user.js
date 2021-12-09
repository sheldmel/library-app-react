const generateToken = require("../utils/generateToken");

const router = require("express").Router();
const userModel = require("../models/UserModel");


router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const books = [];
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.send("User exists");
  }
  console.log(email);
  email = email.toLowerCase()
  const user = await userModel.create({
    firstName,
    lastName,
    email,
    password,
    books,
  });
  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      books: user.books,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
    res.end();
  } else {
    res.send("something went wrong");
  }
});

router.post("/login", async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  console.log(user);
  if (user && (await user.matchPassword(req.body.password))) {
    res.json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      books: user.books,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.send("Invalid");
  }
});

router.post("/updateBooks", async (req, res) => {
  const user = await userModel.findOneAndUpdate(
    { _id: req.body._id },
    { books: req.body.books },
    {
      new: true,
    }
  );
  try {
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.get("/books/:id", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });
  try {
    res.send(user.books);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
