import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import CreateAccountPage from "./Pages/CreateAccountPage";
import HomePage from "./Pages/HomePage";
import DetailsPage from "./Pages/DetailsPage";
import GenreSearchPage from "./Pages/GenreSearchPage";
import { SearchPage } from "./Pages/SearchPage";
export default function App() {
  const user = true;

  return (
    <Router>
      <Switch>
        <Route path="/create-account" exact component={CreateAccountPage} />
        <Route path="/" exact component={user ? LoginPage : HomePage} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/books/:bookid" exact component={DetailsPage} />
        <Route path="/genre/:genre" exact component={GenreSearchPage} />
        <Route path="/book/:search" exact component={SearchPage} />
      </Switch>
    </Router>
  );
}
