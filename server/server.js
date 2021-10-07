const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
var cors = require("cors");
const bookModel = require("./models/BookModel");
const userModel = require('./models/UserModel');
const generateToken = require("./utils/generateToken");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 8081;
app.use(cors());

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
  const user = new userModel(req.body);
  const userExists = await userModel.findOne({Email: req.body.Email})
  if(userExists){
    res.status(400)
    console.log("User Already Exists")
  }
  try {
    await user.save();
    res.send(user.Email);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/login", async (req, res) => {
  const user = await userModel.findOne({Email: req.body.Email})
  console.log(user)
  try {
    if(user && (await user.matchPassword(req.body.Password))){
      res.json({
        _id: user._id,
        Email: user.Email,
        Token: generateToken(user._id)
      })
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/book", async (req, res) => {
  const book = new bookModel(req.body);
  try {
    await book.save();
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
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

app.listen(PORT, console.log(`Server running at ${PORT}`));
