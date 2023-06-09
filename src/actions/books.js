//books actions class
import {
    FETCH_BY_SEARCH,
    LIKE,
    COMMENT,
    SET_BOOKS,
    SELECT_BOOK,
    FETCH_ALL,
    FETCH_BOOK_BY_ID,
    CREATE_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK
} from '../variables/constants/actionTypes';

import * as api from '../api/index';
// Dummy data
const dummyData = [
    {
        _id: '1',
        title: 'Dummy Title 1',
        message: 'Dummy Message 1',
        name: 'Dummy Name 1',
        creator: 'Dummy Creator 1',
        createdAt: new Date(),
        comments: [],
        likes: [],
        tags: ['tag1', 'tag2'],
        selectedFile: 'https://via.placeholder.com/150',
    },
    {
        _id: '2',
        title: 'Dummy Title 2',
        message: 'Dummy Message 2',
        name: 'Dummy Name 2',
        creator: 'Dummy Creator 2',
        createdAt: new Date(),
        comments: [],
        likes: [],
        tags: ['tag3', 'tag4'],
        selectedFile: 'https://via.placeholder.com/150',
    },
];


export const getBooks = () => async (dispatch) => {
    try {
        const { data } = await api.getAllBooks();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const getBook = (id) => async (dispatch) => {
    try {
        const { data } = await api.getBookByIsbn(id);

        dispatch({ type: FETCH_BOOK_BY_ID, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createBook = (book) => async (dispatch) => {
    try {
        const { data } = await api.createBook(book);

        dispatch({ type: CREATE_BOOK, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateBook = (id, book) => async (dispatch) => {
    try {
        const { data } = await api.updateBook(id, book);

        dispatch({ type: UPDATE_BOOK, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteBook = (id) => async (dispatch) => {
    try {
        await api.deleteBook(id);

        dispatch({ type: DELETE_BOOK, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

// ---------------------------------------------------------------------------------------------------------------------
export const setBooks = (books) => {
    console.log("books setbook",books)
    return {
        type: SET_BOOKS,
        payload: books,
    };
};

export const selectBook = (book) => {
    return {
        type: SELECT_BOOK,
        payload: book
    };
};

export const getBookById = (id) => async (dispatch) => {
    try {
        const post = dummyData.find((book) => book._id === id);

        dispatch({
            type: FETCH_BOOK_BY_ID,
            payload: { post },
        });
    } catch (error) {
        console.log(error);
    }
};


export const getBooksBySearch = (searchQuery) => async (dispatch, getState) => {
    try {
        const { books } = getState().books; // Assuming you have a books state in your Redux store

        // Filter or modify the books array based on the searchQuery if needed
        dispatch({ type: FETCH_BY_SEARCH, payload: { data: books } });
    } catch (error) {
        console.log(error);
    }
};

// export const getBooks = () => async (dispatch) => {
//     try {
//         dispatch({
//             type: FETCH_ALL,
//             payload: {
//                 data: dummyData,
//                 currentPage: 1,
//                 numberOfPages: 1,
//             },
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };


export const likeBook = (id) => async (dispatch) => {
    try {
        const post = dummyPosts.find((post) => post._id === id);
        post.likes.push('dummy-like');
        dispatch({ type: LIKE, payload: post });
    } catch (error) {
        console.log(error);
    }
};

export const commentBook = (value, id) => async (dispatch) => {
    try {
        const post = dummyPosts.find((post) => post._id === id);
        const newComment = {
            _id: `comment${post.comments.length + 1}`,
            name: 'New Commenter Name',
            message: value,
            createdAt: new Date(),
        };

        post.comments.push(newComment);

        dispatch({ type: COMMENT, payload: post });

        return post.comments;
    } catch (error) {
        console.log(error);
    }
};

