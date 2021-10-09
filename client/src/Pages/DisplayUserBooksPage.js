import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,

  makeStyles,
} from "@material-ui/core";
import Button from "react-bootstrap/Button";
import { InputGroup } from "reactstrap";
import Bookimage from "../components/Image";
import Topbar from "../components/Navbar";
import { useSelector } from "react-redux";

const DetailsPage = (props) => {
  const { id } = props;
  const { books } = props;
  const { setdbUpdated } = props;
  const { dbUpdated } = props;
  const [book, setBook] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const _id = userInfo._id;
  const classes = useStyles();

  useEffect(() => {
    setBook([]);
    axios
      .get(`http://localhost:8081/books/${id}`)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setBook(data);
        console.log(book);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const deleteBook = (id) => {
    const userBooks = books;
    for (var i = userBooks.length - 1; i >= 0; i--) {
      if (userBooks[i] === id) {
        userBooks.splice(i, 1);
      }
    }
    axios
      .post("http://localhost:8081/updateUserBooks", {
        _id,
        books,
      })
      .then((response) => {
        console.log(response.data);
        setdbUpdated(!dbUpdated);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ marginLeft: "2%" }}>
        <div>
          <InputGroup style={{ width: "100%" }}></InputGroup>
        </div>
        <div>
          <Bookimage id={id}></Bookimage>

          <div className={classes.h2}>
            <h1>
              {book.bookTitle} ({book.yearPublished}){" "}
              <Button size="sm" onClick={() => deleteBook(id)}>
                Remove Book
              </Button>
            </h1>
            <h5 className={classes.h5}> By {book.bookAuthor}</h5>
            <h6 className={classes.h6}>Genre: {book.bookGenre}</h6>
            <hr />
            <p> {book.bookDescription}</p>
          </div>
          <br></br>
        </div>
      </div>
      <hr width="100%"></hr>
    </div>
  );
};

const DisplayUserBooksPage = () => {
  const [books, setBooks] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const [dbUpdated, setdbUpdated] = useState(false);
  const { userInfo } = userLogin;
  const id = userInfo._id;
  useEffect(() => {
    setBooks([]);
    axios
      .get(`http://localhost:8081/userBooks/${id}`)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        {
          document.title = `E-Library: MyBooks`;
        }
        setBooks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dbUpdated]);
  return (
    <Box>
      <Topbar></Topbar>
      {books.map((id) => (
        <DetailsPage
          id={id}
          books={books}
          dbUpdated={dbUpdated}
          setdbUpdated={setdbUpdated}
        />
      ))}
    </Box>
  );
};

const useStyles = makeStyles({
  h2: {
    display: "inline-block",
    float: "left",
    margin: "2%",
  },
  h5: {
    marginLeft: "2%",
  },
  h6: {
    marginLeft: "2%",
  },
  p: {
    float: "left",
    marginLeft: "2%",
  },
  button: {
    border: 0,
    borderRadius: 50,
  },
});

export default DisplayUserBooksPage;
