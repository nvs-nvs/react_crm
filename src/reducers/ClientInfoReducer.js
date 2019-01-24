import {
    CLIENT_INFO_UPDATE_SUCCESS,
    GET_CLIENT_INFO_FAIL,
    GET_CLIENT_INFO_REQUEST,
    GET_CLIENT_INFO_SUCCESS,
} from '../actions/ClientInfoActions';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const initialState = {
    clients: [],
    isFetching: false,
    clientInfo: {},
    isUpdating: false
};

    const clientInfoReducer = function(state = initialState, action) {
    switch (action.type) {
        case    GET_CLIENT_INFO_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case    GET_CLIENT_INFO_SUCCESS:
            return {
                ...state,
                clients: action.clients.data,
                halls: action.clients.data.halls,
                isFetching: false,
            };

        case    GET_CLIENT_INFO_FAIL:
            return {
                ...state,
                isFetching: false
            };

        //case    CLIENT_INFO_UPDATE_SUCCESS:
            //console.log(state);
            // return {
            //     ...state,
            //     isFetching: false,
            //     clients: {...action.clients.data, },
            // };

        default:
            return state;
    }

};

export default clientInfoReducer;

