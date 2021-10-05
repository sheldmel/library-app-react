
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import CreateAccountPage from "./Pages/CreateAccountPage";
import HomePage from "./Pages/HomePage";
import DetailsPage from "./Pages/DetailsPage";
export default function App() {
  const user = true

  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/create-account" exact component={CreateAccountPage}/>
          <Route path="/" exact component={user ? LoginPage : HomePage}/>
          <Route path="/home" exact component={HomePage}/>
          <Route path="/login" exact component={LoginPage}/>
          <Route path="/home/bookDetails/:bookid" exact component={DetailsPage}/>
        </Switch>
    </Router>
  );
}




