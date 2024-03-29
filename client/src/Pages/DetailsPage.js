import React, { useEffect, useState } from "react";
import {
  Box,
  makeStyles,
} from "@material-ui/core";
import { displayBook } from "../api/utils";
import Bookimage from "../components/Image";
import Topbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


export const DetailsPage = (props) => {
  const id = props.match.params.bookid;
  const [book, setBook] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    setBook([]);
    displayBook(id)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        document.title = `E-Library: ${data.bookTitle}`;
        setBook(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <Box>
      <Topbar></Topbar>

      <div style={{ margin: "2%", padding: "2%" }}>
        <Searchbar></Searchbar>
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
            <hr />
            <p> {book.bookDescription}</p>
          </Col>
        </Row>

      </div>
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
  },
});

export default DetailsPage;
