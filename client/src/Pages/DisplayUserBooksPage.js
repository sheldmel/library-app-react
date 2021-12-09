import React, { useEffect, useState } from "react";
import {
  Box,
  makeStyles,
} from "@material-ui/core";
import { displayUserBooks, updateUserBooks, displayBook } from "../api/utils";
import Button from "react-bootstrap/Button";
import Bookimage from "../components/Image";
import Topbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


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
    displayBook(id)
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
    updateUserBooks(_id, userBooks)
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
      <Row style={{ marginTop: "2%"}}>
          <Col sm={3}>
          <div>
            <Bookimage id={book.bookImage} />
          </div>
          </Col>
          <Col area-style sm={6}>
            <h1 className={classes.h1}>
              {book.bookTitle} ({book.yearPublished})
            </h1>
            <h5 className={classes.h5}> By {book.bookAuthor}</h5>
            <h6 className={classes.h6}>Genre: {book.bookGenre}</h6>
            <Button size="sm" style={{marginLeft: '4%'}} onClick={() => deleteBook(id)}>
                Remove Book
              </Button>
            <hr />
            <p> {book.bookDescription}</p>
          </Col>
        </Row>
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
    displayUserBooks(id)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        document.title = `E-Library: MyBooks`;
        setBooks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dbUpdated]);
  return (
    <Box>
      <Topbar></Topbar>
      {books.length === 0 ? (
        <h1 style={{ margin: "5%" }}>You have no books in your List</h1>
      ) : (
        books.map((id) => (
          <DetailsPage
            id={id}
            books={books}
            dbUpdated={dbUpdated}
            setdbUpdated={setdbUpdated}
          />
        ))
      )}
    </Box>
  );
};

const useStyles = makeStyles({
  h1: {
    marginLeft: "2%",
  },
  h5: {
    marginLeft: "4%",
  },
  h6: {
    marginLeft: "4%",
  },
  p: {
    float: "left",
    marginLeft: "4%",
  },
  button: {
    border: 0,
    borderRadius: 50,
    marginLeft: "2%"
  },
});

export default DisplayUserBooksPage;
