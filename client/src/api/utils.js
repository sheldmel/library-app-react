import axios from "axios";

const USER_URL = "http://localhost:8081/api/users";
const BOOK_URL = "http://localhost:8081/api/books";

// Books
export const displayBooks = () => {
  return axios.get(`${BOOK_URL}/`);
};

export const displayBooksByGenre = (genre) => {
  return axios.get(`${BOOK_URL}/genre/${genre}`);
}

export const displayBooksBySearch = (search) => {
  return axios.get(`${BOOK_URL}/search/${search}`);
}

export const displayBook = (id) => {
  return axios.get(`${BOOK_URL}/${id}`)
}

export const deleteBook = (id) => {
  return axios.post(`${BOOK_URL}/delete/${id}`);
};

export const addBook = (
  bookTitle,
  bookDescription,
  bookGenre,
  yearPublished,
  bookAuthor,
  bookImage
) => {
  return axios.post(`${BOOK_URL}/add`, {
    bookTitle,
    bookDescription,
    bookGenre,
    yearPublished,
    bookAuthor,
    bookImage,
  });
};

export const editBook = (
  bookTitle,
  bookDescription,
  bookGenre,
  yearPublished,
  bookAuthor,
  bookImage,
  id
) => {
  return axios.post(`${BOOK_URL}/update/${id}`, {
    bookTitle,
    bookDescription,
    bookGenre,
    yearPublished,
    bookAuthor,
    bookImage,
  });
};

// Users
export const displayUserBooks = (id) => {
  return axios.get(`${USER_URL}/books/${id}`);
};

export const updateUserBooks = (_id, books) => {
  return axios.post(`${USER_URL}/updateBooks`, {
    _id,
    books,
  });
};

export const loginUser = (email, password) => {
  return axios.post(`${USER_URL}/login`, {
    email,
    password,
  });
};

export const registerUser = (email, firstName, lastName, password) => {
  return axios.post(`${USER_URL}/register`, {
    firstName,
    lastName,
    email,
    password,
  });
};
