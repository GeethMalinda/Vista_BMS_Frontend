import React from 'react';
import { Container } from '@mui/material';
import './index.css';
import Navbar from "./components/user/navbar/Navbar";
import SignUp from "./components/auth/Auth";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Auth from "./components/auth/Auth";
import Home from "./components/user/Home/Home";
import BookDetails from './components/user/PostDetails/BookDetails';

const App = () => {
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/auth" />} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/auth" exact component={SignUp} />
                    <Route path="/posts/:id" exact component={BookDetails} />
                </Switch>
            </Container>
        </BrowserRouter>

    );
};

export default App;
