import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Box, makeStyles } from "@material-ui/core";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Bookimage from "../components/Image";
import Topbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import ErrorMessage from "../components/ErrorMessage";
import { useHistory } from "react-router-dom";

export const AddBookPage = (props) => {
  const [bookTitle, setBookTitle] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [yearPublished, setYearPublished] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  useEffect(() => {
    {
      document.title = `E-Library: Add Book`;
    }
  });

  const handleTitleChange = (e) => {
    setBookTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setBookAuthor(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setBookDescription(e.target.value);
  };

  const handleBookImage = (e) => {
    setBookImage(e.target.value);
  };

  const handleYearChange = (e) => {
    setYearPublished(e.target.value);
  };

  const handleGenreChange = (e) => {
    setBookGenre(e.target.value);
  };

  const submitHandler = async () => {
    if (bookTitle === "") {
      setError("The book title cannot be empty");
      return;
    }
    if (bookAuthor === "") {
      setError("The book author cannot be empty");
      return;
    }
    if (bookDescription === "") {
      setError("The book description cannot be empty");
      return;
    }
    if (bookImage === "") {
      setError("The book image link cannot be empty");
      return;
    }
    if (yearPublished === "") {
      setError("The published year cannot be empty");
      return;
    }
    const { data } = await axios.post("http://localhost:8081/addBook", {
      bookTitle,
      bookDescription,
      bookGenre,
      yearPublished,
      bookAuthor,
      bookImage,
    });
    console.log(data);
    history.push("/home");
  };

  return (
    <Box>
      <Topbar></Topbar>
      <div style={{ marginLeft: "2%", padding: "2%" }}>
        <h1 style={{ marginBottom: "2%", marginLeft: "45%" }}>Add Book</h1>
        <Form style={{ width: "80%", marginLeft: "10%" }}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="string"
                onChange={handleTitleChange}
                placeholder="Enter book title"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="string"
                onChange={handleAuthorChange}
                placeholder="Enter book author"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleDescriptionChange}
              placeholder="Enter book description"
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridImage">
            <Form.Label>Image Link</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleBookImage}
              placeholder="Enter book image link"
              rows={1}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridYear">
              <Form.Label>Published Year</Form.Label>
              <Form.Control
                type="string"
                onChange={handleYearChange}
                placeholder="Enter published year"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Select
                defaultValue="Fantasy"
                placeholder="Select Genre"
                onChange={handleGenreChange}
              >
                <option value="Fantasy">Fantasy</option>
                <option value="Fiction">Fiction</option>
                <option value="Novel">Novel</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: "5%" }} className="mb-3">
            <Form.Group
              as={Col}
              style={{ marginLeft: "40%" }}
              controlId="formGridAddButton"
            >
              <Button
                style={{ marginRight: "5%" }}
                variant="primary"
                size="lg"
                onClick={submitHandler}
              >
                Add book
              </Button>
              <Button
                variant="danger"
                size="lg"
                onClick={() => {
                  history.push(`/home`);
                }}
              >
                Cancel
              </Button>
            </Form.Group>
          </Row>
          {error && (
            <ErrorMessage style={{ marginTop: "5%" }} variant="danger">
              {error}
            </ErrorMessage>
          )}
        </Form>
      </div>
    </Box>
  );
};

export default AddBookPage;
