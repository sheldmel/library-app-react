const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const dotenv = require('dotenv');
dotenv.config();

const userRoute = require('./routes/user');
const bookRoute = require('./routes/book')
app.use(cors());
const PORT = process.env.PORT || 8081;


mongoose
  .connect(
    process.env.MONGO_URL,
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

app.use('/api/users', userRoute);
app.use('/api/books', bookRoute);


app.listen(PORT, console.log(`Server running at ${PORT}`));
