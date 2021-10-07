import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Logo from "../components/Logo";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import Bookimage from "../components/Image";
import Topbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

export const DetailsPage = (props) => {
  const id = props.match.params.bookid;
  const [book, setBook] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    setBook([]);
    axios
      .get(`http://localhost:8081/books/${id}`)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        {
          document.title = `E-Library: ${data.bookTitle}`;
        }
        setBook(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box>
      <Topbar></Topbar>

      <div style={{ marginLeft: "2%", padding: "2%" }}>
        <Searchbar></Searchbar>
        <div>
          <Bookimage id={id}></Bookimage>

          <div className={classes.h2}>
            <h1>
              {book.bookTitle} ({book.yearPublished})
            </h1>
            <h5 className={classes.h5}> By {book.bookAuthor}</h5>
            <h6 className={classes.h6}>Genre: {book.bookGenre}</h6>
            <hr />
            <p> {book.bookDescription}</p>
          </div>
        </div>
      </div>
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

export default DetailsPage;
