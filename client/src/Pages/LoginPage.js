import React, { Component, useEffect, useState } from "react";
import { Box, Button, Link, Typography } from "@material-ui/core";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Logo from "../components/Logo";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const history = useHistory();
  //const [user, setUser] = useState(null)
  useEffect(() => {
    document.title = "Login";
    //setUser(localStorage.getItem('userInfo'))
    if (userInfo) {
      history.push(`/home`);
    }
  }, [history, userInfo]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    // history.push(`/home`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      width="50%"
      alignItems="center"
      justifyContent="center"
      marginLeft=" 25%"
    >
      <Logo></Logo>
      {loading && <Loading />}
      <Form style={{ width: "60%" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              onChange={handleEmailChange}
              type="email"
              placeholder="name@example.com"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              onChange={handlePasswordChange}
              type="password"
              placeholder="Password"
            />
          </FloatingLabel>
        </Form.Group>
        <div my={2} style={{ textAlign: "center", margin: "4%" }}>
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            onClick={submitHandler}
          >
            Sign in
          </Button>
        </div>
      </Form>
      <Typography color="textSecondary" variant="body1">
        New User ? <t />
        <Link component={RouterLink} to="/create-account" variant="h6">
          Create an account
        </Link>{" "}
      </Typography>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
    </Box>
  );
};

export default LoginPage;
