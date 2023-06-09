import {
    FETCH_ALL,
    FETCH_BOOK_BY_ID,
    FETCH_BY_SEARCH,
    LIKE,
    COMMENT,
    SET_BOOKS,
    SELECT_BOOK,
    CREATE_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK
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
                books: action.payload.data,
            };
        case FETCH_BOOK_BY_ID:
            return {
                ...state,
                book: action.payload,
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

        // case FETCH_ALL:
        //   return {
        //     ...state,
        //     books: action.payload.data,
        //   };

        // case FETCH_BY_SEARCH:
        //   return {
        //     ...state,
        //     searchResults: action.payload,
        //   };

        // case LIKE:
        //   return {
        //     ...state,
        //     books: state.books.map((book) =>
        //         book.isbn === action.payload.isbn ? action.payload : book
        //     ),
        //   };
        // case COMMENT:
        //   return {
        //     ...state,
        //     books: state.books.map((book) =>
        //         book.isbn === action.payload.isbn ? action.payload : book
        //     ),
        //   };

    }
};

export default bookReducer;
