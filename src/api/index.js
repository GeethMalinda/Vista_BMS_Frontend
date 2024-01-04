import axios from 'axios';
import {toast} from "react-toastify";

const API_URL = 'http://localhost:8082/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {

    return response;
}, function (error) {

    return Promise.reject(error);
});

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response && error.response.status === 403) {
        toast.error("Access Forbidden: You might not have the required permissions.");
    }
    return Promise.reject(error);
});

export const getAllBooks = () => {
    return axiosInstance.get('/books');
}

export const getBookByIsbn = (isbn) => {
    return axiosInstance.get(`/books${isbn}`);
}

export const getBooksByCategory = (category) => {
    return axiosInstance.get(`/books/category/${category}`);
}

export const createBook = (book, bookCoverFile, eBookFile) => {
    const formData = new FormData();
    formData.append('bookDetail', JSON.stringify(book));
    formData.append('book', eBookFile);
    formData.append('cover', bookCoverFile);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    return axiosInstance.post('/books', formData, config);
}

export const updateBook = (book) => {
    return axiosInstance.put('/books', book);
}

export const deleteBook = (isbn) => {
    return axiosInstance.delete(`/books${isbn}`);
}

export const submitReviewApiCall = (reviewObject) => {
    console.log('test review',reviewObject)
    return axiosInstance.post('/review', reviewObject);
}
