import React from 'react';
import {Container} from '@mui/material';
import './index.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Router from "./routes";
import {HelmetProvider} from "react-helmet-async";
import ScrollToTop from "./components/admin/components/scroll-to-top";
import {StyledChart} from "./components/admin/components/chart";
import ThemeProvider from './theme';
import BookDetails from "./components/user/PostDetails/BookDetails";

const App = () => {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <ThemeProvider>
                    <ScrollToTop />
                    <StyledChart />

                    <Container maxWidth="xl">

                        {/* <Route path="/" exact component={() => <Redirect to="/auth" />} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/auth" exact component={SignUp} />
                    <Route path="/posts/:id" exact component={BookDetails} />*/}
                        <Router/>
                    </Container>
                </ThemeProvider>
            </BrowserRouter>
        </HelmetProvider>

    );
};

export default App;
