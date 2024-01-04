// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {reducers} from "./reducers";
import {LoaderProvider} from "./provider/LoaderProvider";

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));


ReactDOM.render(
    <Provider store={store}>
        <LoaderProvider>
            <App />
        </LoaderProvider>
    </Provider>,
    document.getElementById('root')
);