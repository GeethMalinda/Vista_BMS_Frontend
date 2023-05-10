import {
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  LIKE,
  COMMENT,
  SET_BOOKS, SELECT_BOOK,
} from "../constants/actionTypes";

const initialState = {
  books: [],
  book: null,
  searchResults: [],
  selectedBook: null
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case SELECT_BOOK:
      return {...state, selectedBook: action.payload};

    case FETCH_ALL:
      return {
        ...state,
        books: action.payload.data,
      };
    case FETCH_POST:
      return {
        ...state,
        book: action.payload.post,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        searchResults: action.payload.data,
      };
    case LIKE:
      return {
        ...state,
        books: state.books.map((book) =>
            book._id === action.payload._id ? action.payload : book
        ),
      };
    case COMMENT:
      return {
        ...state,
        books: state.books.map((book) =>
            book._id === action.payload._id ? action.payload : book
        ),
      };
    default:
      return state;
  }
};

export default bookReducer;
