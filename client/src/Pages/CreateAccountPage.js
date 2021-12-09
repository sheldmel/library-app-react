import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Link,
  Typography,
} from "@material-ui/core";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link as RouterLink} from "react-router-dom";
import Logo from "../components/Logo";
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { useHistory } from "react-router-dom";

export const CreateAccountPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userRegister;
  const { userLoginInfo } = userLogin;
  const history = useHistory();

  useEffect(() => {
    document.title = "Register";
    if (userLoginInfo) {
      history.push(`/home`);
    }
  }, [history, userInfo, userLoginInfo]);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(pw) {
    return (
      /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 4
    );
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage("Invalid Email! Please try again");
      return;
    }
    if (!validatePassword(password)) {
      setMessage(
        "Invalid Password! Password must contain one upper case letter, one lower case letter, a number and be minimum 4 characters long"
      );
      return;
    }
    if (password !== password2) {
      setMessage("Passwords do not match"); 
      console.log(password)     
      console.log(password2) 
      return;
    }
    dispatch(register(firstName, lastName, email, password));
    history.push('/login')
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
      <Form style={{ width: "70%" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput1"
                label="First Name"
                className="mb-3"
              >
                <Form.Control
                  placeholder="First name"
                  onChange={handleFirstNameChange}
                  type="email"
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput2"
                label="Last Name"
                className="mb-3"
              >
                <Form.Control
                  placeholder="Last name"
                  onChange={handleLastNameChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <FloatingLabel
            controlId="floatingInput3"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={handleEmailChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword1"
            className="mb-3"
            label="Password"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword2" label="Confirm Password">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={handlePassword2Change}
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
            Create Account
          </Button>
        </div>
      </Form>
      <Typography color="textSecondary" variant="body1">
        Have an account ? <t />
        <Link component={RouterLink} to="/login" variant="h6">
          Sign in
        </Link>{" "}
      </Typography>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
    </Box>
  );
};

export default CreateAccountPage;
