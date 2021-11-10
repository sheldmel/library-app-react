import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import CreateAccountPage from "./Pages/CreateAccountPage";
import HomePage from "./Pages/HomePage";
import DetailsPage from "./Pages/DetailsPage";
import GenreSearchPage from "./Pages/GenreSearchPage";
import { SearchPage } from "./Pages/SearchPage";
import DisplayUserBooksPage from "./Pages/DisplayUserBooksPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AddBookPage from "./Pages/AddBookPage";
import EditBookPage from "./Pages/EditBookPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/create-account" exact component={CreateAccountPage} />
        <ProtectedRoute path="/" exact component={HomePage} />
        <ProtectedRoute path="/home" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <ProtectedRoute path="/books/:bookid" exact component={DetailsPage} />
        <ProtectedRoute
          path="/genre/:genre"
          exact
          component={GenreSearchPage}
        />
        <ProtectedRoute path="/book/:search" exact component={SearchPage} />
        <ProtectedRoute
          path="/mybooks"
          exact
          component={DisplayUserBooksPage}
        />
        <ProtectedAdminRoute path="/addBook" exact component={AddBookPage} />
        <ProtectedAdminRoute
          path="/editBook/:bookid"
          exact
          component={EditBookPage}
        />
      </Switch>
    </Router>
  );
}
