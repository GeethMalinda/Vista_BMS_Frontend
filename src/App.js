import React from 'react';
import { Container } from '@mui/material';
import './index.css';
import Navbar from "./components/user/navbar/Navbar";
import SignUp from "./components/auth/Auth";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Auth from "./components/auth/Auth";
import Home from "./components/user/Home/Home";
import BookDetails from './components/user/PostDetails/BookDetails';
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <React.StrictMode>
                <ThemeEditorProvider>
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
                </ThemeEditorProvider>
            </React.StrictMode>
        </ChakraProvider>


    );
};

export default App;
