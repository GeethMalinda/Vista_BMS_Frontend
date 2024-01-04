import {
    FETCH_BY_SEARCH,
    LIKE,
    SET_BOOKS,
    SELECT_BOOK,
    FETCH_ALL,
    FETCH_BOOK_BY_ID,
    CREATE_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK,
    CATEGORY_FICTION,
    CATEGORY_NONFICTION,
    CATEGORY_KIDS,
    CATEGORY_SCIENCE_TECHNOLOGY,
    CATEGORY_GRAPHIC_NOVELS_COMICS, CATEGORY_POETRY, SUBMIT_REVIEW_FAILURE, SUBMIT_REVIEW_SUCCESS, SUBMIT_REVIEW_REQUEST
} from '../variables/constants/actionTypes';
import { toast } from 'react-toastify';
import * as api from '../api/index';
import {submitReviewApiCall} from "../api/index";

export const submitReview = (reviewObject) => async (dispatch) => {
    dispatch({ type: SUBMIT_REVIEW_REQUEST });

    try {
        const response = await submitReviewApiCall(reviewObject);

        dispatch({
            type: SUBMIT_REVIEW_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: SUBMIT_REVIEW_FAILURE,
            payload: error.message
        });
    }
};
export const getBooks = () => async (dispatch) => {
    try {
        const { data } = await api.getAllBooks();
        toast.success('Successfully fetched books');
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
        toast.error(`Error: ${error.message}`);
    }
}

export const getBookByCategory = (category) => async(dispatch) => {
    try {
        let categoryConstant = '';
        switch (category) {
            case 'Fiction':
                categoryConstant = CATEGORY_FICTION;
                break;
            case 'Nonfiction':
                categoryConstant = CATEGORY_NONFICTION;
                break;
            case 'Kids':
                categoryConstant = CATEGORY_KIDS;
                break;
            case 'Science & Technology':
                categoryConstant = CATEGORY_SCIENCE_TECHNOLOGY;
                break;
            case 'Graphic Novels & Comics':
                categoryConstant = CATEGORY_GRAPHIC_NOVELS_COMICS;
                break;
            case 'Poetry':
                categoryConstant = CATEGORY_POETRY;
                break;
            default:
                throw new Error(`Unknown category: ${category}`);
        }

        const { data } = await api.getBooksByCategory(categoryConstant);
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
        toast.error(`Error: ${error.message}`);
    }
}

export const getBook = (id) => async (dispatch) => {
    try {
        const { data } = await api.getBookByIsbn(id);
        toast.success('Successfully Books Loaded');
        dispatch({ type: FETCH_BOOK_BY_ID, payload: data });
    } catch (error) {
        console.log(error.message);
        toast.error(`Failed to fetch the book: ${error.message}`);
    }
}

export const createBook = (book, bookCoverFile, eBookFile) => async (dispatch) => {
    try {
        const { data } = await api.createBook(book, bookCoverFile[0], eBookFile[0]);
        toast.success('Book created successfully');
        dispatch({ type: CREATE_BOOK, payload: data });
    }catch (error) {
        console.log(error.message);
        toast.error(`Failed to create the book: ${error.message}`);
    }
}

export const updateBook = (id, book) => async (dispatch) => {
    try {
        const { data } = await api.updateBook(book);
        toast.success('Book updated successfully');
        dispatch({ type: UPDATE_BOOK, payload: data });
    } catch (error) {
        console.log(error.message);
        toast.error(`Failed to update the book: ${error.message}`);
    }
}

export const deleteBook = (id) => async (dispatch) => {
    try {
        await api.deleteBook(id);
        toast.success('Book deleted successfully');
        dispatch({ type: DELETE_BOOK, payload: id });
    } catch (error) {
        console.log(error.message);
        toast.error(`Failed to delete the book: ${error.message}`);
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

// export const commentBook = (value, id) => async (dispatch) => {
//     try {
//         const post = dummyPosts.find((post) => post._id === id);
//         const newComment = {
//             _id: `comment${post.comments.length + 1}`,
//             name: 'New Commenter Name',
//             message: value,
//             createdAt: new Date(),
//         };
//
//         post.comments.push(newComment);
//
//         dispatch({ type: COMMENT, payload: post });
//
//         return post.comments;
//     } catch (error) {
//         console.log(error);
//     }
// };

