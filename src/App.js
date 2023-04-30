import React from 'react';
import { Container } from '@mui/material';
import './index.css';
import Navbar from "./components/navbar/Navbar";
import SignUp from "./components/Auth/Auth";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import BookList from "./components/Dashbord/Home";

const App = () => {
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <BookList/>
            {/*    <Switch>
                    <Route path="/" exact component={() => <Redirect to="/auth" />} />
                    <Route path="/" exact component={BookList} />
                </Switch>*/}
             {/*   <SignUp/>*/}
            </Container>
        </BrowserRouter>

    );
};

export default App;
