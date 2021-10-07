import React, { Component, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Box } from "@material-ui/core";
import Logo from "../components/Logo";
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
import axios from "axios";

function BasicTable(props) {
  const rows = props.rows;

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
                <Button size="sm">Add Book</Button>
              </TableCell>
              <TableCell align="right">
                <Link to={`/books/${row._id}`}>
                  <Button size="sm">View Details</Button>
                </Link>
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
  const search = props.match.params.search;
  useEffect(() => {
    console.log(search);
    document.title = `E-Library: ${search}`;
    axios
      .get(`http://localhost:8081/bookSearch/${search}`)
      .then((response) => {
        if (response.data.length != 0) {
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
  }, [search]);
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
      </div>
      {rows === "" ? (
        <h2 style={{ margin: "4%" }}>No results were found. </h2>
      ) : (
        <BasicTable rows={rows}></BasicTable>
      )}
    </Box>
  );
};
