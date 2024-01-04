import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Navbar from "../user/navbar/Navbar";
import {toast} from "react-toastify";
import AuthService from "../../api/auth";

const initialState = { firstName: '', lastName: '', name: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      const defaultRoles = ['ROLE_USER'];

      const userData = {
        username: form.firstName +' '+form.lastName,
        password: form.password,
        roles: defaultRoles
      };

      try {
        await AuthService.register(userData);
        toast.success('Registration successful');
        switchMode();
      } catch (error) {
        toast.error(error.response || 'Registration failed');
      }
    } else {
      try {
        const response = await AuthService.login(form.name, form.password);
        toast.success('Login successful');
        navigate('/admin');
      } catch (error) {
        toast.error(error.response || 'Invalid login credentials');
      }
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
      <>
        <Navbar />
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={6}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                { isSignup && (
                    <>
                      <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                      <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                    </>
                )}
                <Input name="name" label="Email Address" handleChange={handleChange} type="text" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                { isSignup ? 'Sign Up' : 'Sign In' }
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Button onClick={switchMode}>
                    { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </>
  );
};

export default SignUp;
