const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  bookTitle: {
    type: String,
    required: true,
  },
  bookDescription: {
    type: String,
    default: "No Description",
  },
  bookGenre: {
    type: String,
    required: true,
    trim: true,
  },
  bookAuthor: {
    type: String,
  },
  bookImage: {
    type: String,
  },
  yearPublished: {
    type: String,
  },
});

const Book = mongoose.model("BooksModel", BookSchema);
module.exports = Book;
