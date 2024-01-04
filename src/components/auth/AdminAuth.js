import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Navbar from "../user/navbar/Navbar";
import {toast} from "react-toastify";

const initialState = { firstName: '', lastName: '', name: '', password: '', confirmPassword: '' };

const AdminSignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('hi')
    // Check credentials for specific routes
    if (form.name === 'admin' && form.password === '1234') {
      navigate('/admin');
      console.log('si')

    } else if (form.name === 'geeth' && form.password === '1234') {
      navigate('/customer');
      console.log('pi')

    } else {
      // Show toast message for incorrect login
      toast.error('Incorrect email or password');
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

export default AdminSignUp;
