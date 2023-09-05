import axios from 'axios';

const API_URL = 'http://localhost:8082/api';

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
