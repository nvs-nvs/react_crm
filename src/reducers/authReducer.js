import isEmpty from 'lodash/isEmpty';
import { LOGIN, LOGOUT } from '../actions/AuthActions';
import { PURGE, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
    isFetching: false,
    error: false,
    isAuthentificated: false,
    errorMessage: '',
};

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['isAuthentificated']
};

const authReducer = function (state = initialState, { type, payload }) {
    switch (type) {
        case PURGE:
            return { ...state, isAuthentificated: false, isFetching: false, error: false, errorMessage: ''};
        case LOGIN:
            return { ...state, isFetching: true, error: false, errorMessage: ''};
        case `${LOGIN}_SUCCESS`:
            return { ...state, isAuthentificated: payload.data && payload.data.auth ? !isEmpty(payload.data) : false, isFetching: false, error: false, errorMessage: ''};
        case `${LOGIN}_FAIL`:
            localStorage.clear();
            return {...state, isAuthentificated: false, isFetching: false, error: true, errorMessage: payload.response && payload.response.status == 401 ? 'Неправильный логин и/или пароль ' : payload.message};
        case LOGOUT:
            return {...state, isAuthentificated: false, isFetching: true, error: false, errorMessage: ''};
        default:
            return state;
    }
};

export default persistReducer(persistConfig, authReducer);
