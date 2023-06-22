import axios from 'axios';

const API_URL = 'http://localhost:8080/api/books';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(function (config) {
    // Here, you can still perform actions before the request is sent
    return config;
}, function (error) {
    // If there's an error in the request, reject the Promise
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export const getAllBooks = () => {
    return axiosInstance.get('/');
}

export const getBookByIsbn = (isbn) => {
    return axiosInstance.get(`/${isbn}`);
}

export const getBooksByCategory = (category) => {
    return axiosInstance.get(`/category/${category}`);
}

export const createBook = (book) => {
    return axiosInstance.post('/', book);
}

export const updateBook = (book) => {
    return axiosInstance.put('/', book);
}

export const deleteBook = (isbn) => {
    return axiosInstance.delete(`/${isbn}`);
}
