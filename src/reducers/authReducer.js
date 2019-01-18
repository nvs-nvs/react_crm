import isEmpty from 'lodash/isEmpty';
import {LOGIN, LOGOUT} from '../actions/AuthActions';
import {persistReducer, PURGE} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    isFetching: false,
    error: false,
    isAuthentificated: false,
    message: '',
};

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['isAuthentificated'],
};

const authReducer = function(state = initialState, {type, payload}) {
    switch (type) {
        
        case PURGE:
        case LOGOUT:
            return {
                ...state,
                isAuthentificated: false,
                isFetching: false,
                error: false,
                message: '',
            };
            
        case LOGIN:
            return {
                ...state,
                isFetching: true,
                error: false,
                message: ''
            };
            
        case `${LOGIN}_SUCCESS`:
            return {
                ...state,
                isAuthentificated: payload.data && payload.data.auth ? !isEmpty(
                    payload.data) : false,
                isFetching: false,
                error: payload.data.error,
                message: payload.data.message,
            };
            
        case `${LOGIN}_FAIL`:
            localStorage.clear();
            
            return {
                ...state,
                isAuthentificated: false,
                isFetching: false,
                error: true,
                message: payload.response && (payload.response.status === 401 || payload.response.status === 400)
                    ? payload.response.data.message
                    : 'Нет связи с сервером',
            };
            
        default:
            return state;
    }
};

export default persistReducer(persistConfig, authReducer);
