const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors')
const bookModel = require('./models/BookModel');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const PORT = process.env.PORT || 8081;
app.use(cors())

mongoose.connect("mongodb+srv://Shelton:test123@cluster0.qusgr.mongodb.net/Library?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(express.json());

app.get('/books', async (req, res) => {
    const books = await bookModel.find({});
    try {
        res.send(books);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.get('/book/:genre', async (req, res) => {
  const books = await bookModel.find({bookGenre: req.params.genre});
  try {
      res.send(books);
  } catch (err) {
      res.status(500).send(err);
  }
});

app.post('/book', async (req, res) => {
    const book = new bookModel(req.body);
    try {
      await book.save();
      res.send(book);
    } catch (err) {
      res.status(500).send(err);
    }
  });

app.get('/books/:id', async (req, res) => {
  const book = await bookModel.findOne({ _id: req.params.id})  
  try {
        res.send(book)
      } catch (err) {
        res.status(500).send(err)
      }
});

app.listen(PORT, console.log(`Server running at ${PORT}`));
