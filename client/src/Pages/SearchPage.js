import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import Topbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { displayUserBooks, updateUserBooks, deleteBook, displayBooksBySearch } from "../api/utils";
import { useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";

function BasicTable(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const _id = userInfo._id;
  const isAdmin = userInfo.isAdmin;
  const rows = props.rows;
  const setError = props.setError;
  const userBooks = props.userBooks;
  const toggleDb = props.toggleDb
  const dbUpdated = props.dbUpdated
  
  function NonAdminbutton(props) {
    return (
      <Button size="sm" onClick={() => addBook(props.id)}>
        Add Book
      </Button>
    );
  }

  function Adminbutton(props) {
    return (
      <Link to={`/editBook/${props.id}`}>
        <Button size="sm">Edit Book</Button>
      </Link>
    );
  }

  function NonAdminbutton2(props) {
    return (
      <Link to={`/books/${props.id}`}>
        <Button size="sm">View Details</Button>
      </Link>
    );
  }
  function Adminbutton2(props) {
    return (
      <Button size="sm" onClick={() => removeBook(props.id)}>
        Delete book
      </Button>
    );
  }

  const addBook = (id) => {
    if (userBooks.includes(id)) {
      setError("Book is already in your list.");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (userBooks.length > 5) {
      console.log("list full");
      setError("Your list is full. Cannot add a new book");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      const books = userBooks;
      books.push(id);
      updateUserBooks(_id, books)
        .then((response) => {
          console.log(response.data);
          setError("Book was added successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const removeBook = (id, name) => {
    deleteBook(id)
    .then(() => {
      setError( `${name} was deleted`);
      setTimeout(() => {
        setError("");
      }, 3000);
      toggleDb(!dbUpdated)
    })
    .catch((err) => {
      console.log(err);
    });
  };
  return (
    <TableContainer
      style={{ marginLeft: "4%", width: "80%" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Published year</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.bookTitle}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.bookTitle}
              </TableCell>
              <TableCell align="right">{row.bookGenre}</TableCell>
              <TableCell align="right">{row.bookAuthor}</TableCell>
              <TableCell align="right">{row.yearPublished}</TableCell>
              <TableCell align="right">
              {isAdmin ? (
                  <Adminbutton id={row._id} />
                ) : (
                  <NonAdminbutton id={row._id} />
                )}
              </TableCell>
              <TableCell align="right">
              {isAdmin ? (
                  <Adminbutton2 id={row._id} />
                ) : (
                  <NonAdminbutton2 id={row._id} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const SearchPage = (props) => {
  const [rows, setRows] = useState("");
  const [error, setError] = useState("");
  const [userBooks, setUserBooks] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const id = userInfo._id;
  const search = props.match.params.search;
  const [dbUpdated, toggleDb] = useState(false)
  useEffect(() => {
    console.log(search);
    document.title = `E-Library: ${search}`;
    displayBooksBySearch(search)
      .then((response) => {
        if (response.data.length !== 0) {
          console.log(response.data);
          const data = response.data;
          setRows(data);
        } else {
          setRows("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    displayUserBooks(id)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        document.title = `E-Library: MyBooks`;
        setUserBooks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, dbUpdated]);
  return (
    <Box>
      <Topbar></Topbar>
      <div
        style={{
          marginLeft: "2%",
          padding: "2%",
          width: "60%",
          flexDirection: "row",
        }}
      >
        <Searchbar></Searchbar>
        {error && (
          <ErrorMessage style={{ marginTop: "5%" }} variant="success">
            {error}
          </ErrorMessage>
        )}
      </div>
      {rows === "" ? (
        <h2 style={{ margin: "4%" }}>No results were found. </h2>
      ) : (
        <BasicTable
          rows={rows}
          userBooks={userBooks}
          error={error}
          setError={setError}
          dbUpdated={dbUpdated}
        ></BasicTable>
      )}
    </Box>
  );
};
