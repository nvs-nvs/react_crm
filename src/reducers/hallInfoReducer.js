import {
    GET_HALL_INFO_FAIL,
    GET_HALL_INFO_REQUEST,
    GET_HALL_INFO_SUCCESS,
    HALL_INFO_UPDATE_REQUEST,
    HALL_INFO_UPDATE_FAIL, HALL_INFO_UPDATE_SUCCESS,
} from '../actions/HallInfoActions';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const initialState = {
    error: false,
    message: '',
    isUpdating: false,
    clients: [],
    isFetching: false,
    hallInfo: {}
};

const hallInfoReducer = function(state = initialState, action) {
    switch (action.type) {
        case    GET_HALL_INFO_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: false,
                message: ''
            };
            
        case    GET_HALL_INFO_SUCCESS:
            return {
                ...state,
                clients: action.payload.data.clients,
                hallInfo: action.payload.data.hallInfo,
                isFetching: false,
            };
            
        case    GET_HALL_INFO_FAIL:
            return {
                ...state,
                isFetching: false,
                error: true,
                message: action.payload.response ? action.payload.response.data.message : 'Network Error'
            };
            
        case HALL_INFO_UPDATE_REQUEST:
            return {
                ...state,
                isUpdating: true,
                error: false,
                message: ''
            };
    
        case HALL_INFO_UPDATE_SUCCESS:
            const {response, updatedRow, index} = action.payload;
            let newState = {...state};
            newState.clients[index] = updatedRow;
            return {
                ...state,
                clients: newState.clients,
                isFetching: false,
                isUpdating: false,
            };
            
        case   HALL_INFO_UPDATE_FAIL:
            return {
                ...state,
                isUpdating: false,
                error: true,
                message: action.payload.response ? action.payload.response.data.message : 'Network Error'
            };
        default:
            return state;
    }
    
};

export default hallInfoReducer;

