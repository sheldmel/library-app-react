import React, { Component , useEffect, useState} from 'react'
import axios from 'axios';
import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
    makeStyles
  } from '@material-ui/core';
import Logo from '../components/Logo';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Bookimage from '../components/Image';
export const DetailsPage = (props) => {
    const id = props.match.params.bookid
    const [book, setBook] = useState([]);

    useEffect(() => {
      axios.get(`http://localhost:8081/books/${id}`)
      .then((response)=> {
        console.log(response.data)
        const data = response.data
        setBook(data)
      })
      .catch((err)=> {
        console.log(err)
      })
    }, []);
        return (
            <Box
            display="flex"
            flexDirection="column"
            height="100%"
            width = '50%'
            alignItems = 'center'
            justifyContent="center"
            marginLeft=" 25%"
            >
                <Bookimage id = {id}></Bookimage>
                {book.bookTitle}
                <br/>
                {book.bookDescription}
                <br/>
                {book.bookGenre}
                <br/>
                {book.yearPublished}
            </Box>
        )
}

export default DetailsPage