import {SUBMIT_REVIEW_FAILURE, SUBMIT_REVIEW_REQUEST, SUBMIT_REVIEW_SUCCESS} from "../variables/constants/actionTypes";

const initialState = {
    review: null,
    loading: false,
    error: null
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_REVIEW_REQUEST:
            return { ...state, loading: true };
        case SUBMIT_REVIEW_SUCCESS:
            return { ...state, loading: false, review: action.payload };
        case SUBMIT_REVIEW_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default reviewReducer;
