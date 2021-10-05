import React, { Component } from 'react'
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
export const LoginPage = () => {
        const [values, setValues] = React.useState({
            amount: '',
            password: '',
            weight: '',
            weightRange: '',
            showPassword: false,
          });
        
          const handleChange = (prop) => (event) => {
            setValues({ ...values, [prop]: event.target.value });
          };
        
          const handleClickShowPassword = () => {
            setValues({
              ...values,
              showPassword: !values.showPassword,
            });
          };
        
          const handleMouseDownPassword = (event) => {
            event.preventDefault();
          };

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
                <Logo></Logo>
                <Box my={2} >
                <TextField
                  // error={Boolean(touched.email && errors.email)}
                  fullWidth
                  // helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  type="email"
                  variant="outlined"
                />
                <TextField
                  // error={Boolean(touched.password && errors.password)}
                  fullWidth
                  // helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  type="password"
                  variant="outlined"
                />
                </Box>
                <Box my={2}>
                <Link
                component={RouterLink}
                to="/home"
                variant="h6"
                >
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in
                  </Button>
                  </Link>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  New User ? <t/>
                  <Link
                    component={RouterLink}
                    to="/create-account"
                    variant="h6"
                  >
                    Create an account
                  </Link>
                  {' '}
                </Typography>
            </Box>
        )
}

export default LoginPage
