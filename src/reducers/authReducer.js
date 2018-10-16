import isEmpty from 'lodash/isEmpty';
import { LOGIN, LOGOUT } from '../actions/AuthActions';
import { PURGE, REHYDRATE } from 'redux-persist';

const initialState = {
    isFetching: false,
    error: false,
    isAuthenticated: false,
    errorMessage: '',
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case PURGE:
            return { ...state, isAuthenticated: false, isFetching: false, error: false, errorMessage: ''};
        case LOGIN:
            return { ...state, isFetching: true, error: false, errorMessage: ''};
        case `${LOGIN}_SUCCESS`:
            return { ...state, isAuthenticated: payload.data && payload.data.auth ? !isEmpty(payload.data) : false, isFetching: false, error: false, errorMessage: ''};
        case `${LOGIN}_FAIL`:
            localStorage.clear();
            return { isAuthenticated: false, isFetching: false, error: true, errorMessage: payload.response.status && payload.response.status == 401 ? 'Неправильный логин и/или пароль ' : payload.message };
        case LOGOUT:
            return { isAuthenticated: false, isFetching: true, error: false, errorMessage: '' };
        case `${LOGOUT}_SUCCESS`:
            return { ...state, isAuthenticated: false, isFetching: false, error: false, errorMessage: '' };
        case `${LOGOUT}_FAIL`:
            return { ...state, isFetching: false, error: true, errorMessage: payload.message };
        default:
            return state;
    }
}
