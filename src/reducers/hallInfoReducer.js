import {
    GET_HALL_INFO_FAIL,
    GET_HALL_INFO_REQUEST,
    GET_HALL_INFO_SUCCESS,
} from '../actions/HallInfoActions';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const initialState = {
    clients: [],
    isFetching: false,
    hallInfo: {},
};

const persistConfig = {
    key: 'hall_info',
    storage,
    blacklist: ['isFetching'],
};

const hallInfoReducer = function(state = initialState, action) {
    switch (action.type) {
        case    GET_HALL_INFO_REQUEST:
            return {
                ...state,
                isFetching: true
            };
            
        case    GET_HALL_INFO_SUCCESS:
            return {
                ...state,
                clients: action.payload.data.clients,
                hallInfo: action.payload.data.hall_info,
                isFetching: false,
            };
            
        case    GET_HALL_INFO_FAIL:
            return {
                ...state,
                isFetching: false
            };
            
        default:
            return state;
    }
    
};

export default persistReducer(persistConfig, hallInfoReducer);

