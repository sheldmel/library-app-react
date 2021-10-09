const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
var cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const bookModel = require("./models/BookModel");
const userModel = require("./models/UserModel");
const generateToken = require("./utils/generateToken");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 8081;
app.use(cors());
// app.use(notFound)
// app.use(errorHandler)
mongoose
  .connect(
    "mongodb+srv://Shelton:test123@cluster0.qusgr.mongodb.net/Library?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use(express.json());

app.get("/books", async (req, res) => {
  const books = await bookModel.find({});
  try {
    res.send(books);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/book/:genre", async (req, res) => {
  const books = await bookModel.find({ bookGenre: req.params.genre });
  try {
    res.send(books);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/bookSearch/:search", async (req, res) => {
  const s = req.params.search;
  const search = s.replace(/%20/g, " ");
  const books = await bookModel.find({
    $or: [
      {
        bookTitle: { $regex: search, $options: "i" },
      },
      {
        bookAuthor: { $regex: search, $options: "i" },
      },
    ],
  });
  try {
    res.send(books);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const books = [];
  //const user = new userModel({ firstName, lastName, email, password });
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.send("User exists");
  }
  console.log(email);
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
      token: generateToken(user._id),
    });
  } else {
    res.send("something went wrong");
  }
});

app.post("/login", async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  console.log(user);
  if (user && (await user.matchPassword(req.body.password))) {
    res.json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      books: user.books,
      token: generateToken(user._id),
    });
  } else {
    res.send("Invalid");
  }
});

app.post("/book", async (req, res) => {
  const book = new bookModel(req.body);
  try {
    await book.save();
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

app.post("/updateUserBooks", async (req, res) => {
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
app.get("/books/:id", async (req, res) => {
  const book = await bookModel.findOne({ _id: req.params.id });
  try {
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/userBooks/:id", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });
  try {
    res.send(user.books);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, console.log(`Server running at ${PORT}`));
