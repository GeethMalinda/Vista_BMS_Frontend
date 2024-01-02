import {
    FETCH_ALL,
    FETCH_BOOK_BY_ID,
    // FETCH_BY_SEARCH,
    // LIKE,
    // COMMENT,
    SET_BOOKS,
    SELECT_BOOK,
    CREATE_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK, ADD_COMMENT
} from "../variables/constants/actionTypes";

const initialState = {
    books: [],
    book: null,
    searchResults: [],
    selectedBook: null
};

const bookReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_ALL:
            return {
                ...state,
                books: action.payload,
            };
        case FETCH_BOOK_BY_ID:
            return {
                ...state,
                book: action.payload,
            };
        case ADD_COMMENT:
            console.log("Received ADD_COMMENT action with payload: ", action.payload); // Debugging log
            const updatedBooks = state.books.map((book) => {
                console.log("Checking book with isbn: ", book.isbn);  // Debugging log
                if (book.isbn === action.payload.isbn) {
                    console.log("Found matching book, adding comment");  // Debugging log
                    const updatedBook = {...book, comments: book.comments ? [...book.comments, action.payload.comment] : [action.payload.comment]};
                    console.log('Updated Book:', updatedBook); // Debugging log for the updated book
                    return updatedBook;
                } else {
                    return book;
                }
            });

            console.log('Updated Books:', updatedBooks); // Debugging log for the updated books
            return {
                ...state,
                books: updatedBooks,
            };

        case CREATE_BOOK:
            return {
                ...state,
                books: [...state.books, action.payload]
            };
        case UPDATE_BOOK:
            return {
                ...state,
                books: state.books.map((book) => book.isbn === action.payload.isbn ? action.payload : book),
            };
        case DELETE_BOOK:
            return {
                ...state,
                books: state.books.filter((book) => book.isbn !== action.payload)
            };
        case SET_BOOKS:
            return {
                ...state,
                books: action.payload,
            };
        case SELECT_BOOK:
            return {
                ...state,
                selectedBook: action.payload
            };
        default:
            return state;


    }
};

export default bookReducer;
