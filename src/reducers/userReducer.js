import {LOGIN, LOGOUT} from '../actions/AuthActions';
import storage from 'redux-persist/lib/storage';
import { persistReducer, PURGE } from 'redux-persist';

const initialState = {};

const persistConfig = {
    key: 'user',
    storage,
    whitelist: [
        'active',
        'id',
        'created_at',
        'email',
        'name',
        'password',
        'position',
        'role',
        'username',
    ],
};

const userReducer = function(state = initialState, {type, payload}) {
    switch (type) {
        case `${LOGIN}_SUCCESS`:
            return {
                ...state,
                ...payload.data.user
            };
            
        case `${LOGIN}_FAIL`:
            localStorage.clear();
            return {
                ...initialState
            };
            
        case LOGOUT:
            localStorage.clear();
            return initialState;
            
        default:
            return state;
    }
};

export default persistReducer(persistConfig, userReducer);