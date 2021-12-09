const router = require("express").Router();
const bookModel = require("../models/BookModel");

router.get("/", async (req, res) => {
  const books = await bookModel.find({});
  try {
    res.send(books);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/genre/:genre", async (req, res) => {
  const books = await bookModel.find({ bookGenre: req.params.genre });
  try {
    res.send(books);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/search/:search", async (req, res) => {
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

router.post("/add", async (req, res) => {
  const book = new bookModel(req.body);
  try {
    await book.save();
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    book = await bookModel.deleteOne({ _id: req.params.id });
    res.send(book.bookTitle);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.post("/update/:id", async (req, res) => {
  const {
    bookTitle,
    bookDescription,
    bookGenre,
    yearPublished,
    bookAuthor,
    bookImage,
  } = req.body;
  const book = await bookModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        bookTitle: bookTitle,
        bookDescription: bookDescription,
        bookGenre: bookGenre,
        yearPublished: yearPublished,
        bookAuthor: bookAuthor,
        bookImage: bookImage,
      },
    },
    {
      new: true,
    }
  );
  try {
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await bookModel.findOne({ _id: req.params.id });
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
