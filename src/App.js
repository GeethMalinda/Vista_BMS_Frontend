import React from 'react';
import {Container} from '@mui/material';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import Router from "./routes";
import {HelmetProvider} from "react-helmet-async";
import ScrollToTop from "./components/admin/components/scroll-to-top";
import {StyledChart} from "./components/admin/components/chart";
import ThemeProvider from './theme';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./components/loader/Loader";

const App = () => {
    return (
        <>
            <HelmetProvider>
                <BrowserRouter>
                    <ThemeProvider>
                        <ScrollToTop/>
                        <StyledChart/>
                        <Container maxWidth="xl">
                            <Router/>
                        </Container>
                    </ThemeProvider>
                </BrowserRouter>
            </HelmetProvider>
            <ToastContainer/>
        </>
    );
};

export default App;
