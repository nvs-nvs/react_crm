import {
    GET_HALL_INFO_FAIL,
    GET_HALL_INFO_REQUEST,
    GET_HALL_INFO_SUCCESS,
    HALL_INFO_UPDATE_REQUEST,
    HALL_INFO_UPDATE_FAIL,
    HALL_INFO_UPDATE_SUCCESS,
    HALL_INFO_UPDATE_DHCP,
    HALL_INFO_UPDATE_ONOFF_HALL,
    HALL_INFO_UPDATE_PARTNER_HALL,
} from '../actions/HallInfoActions';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const initialState = {
    error: false,
    message: '',
    clients: [],
    isFetching: false,
    hallInfo: {},
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
                error: false,
                message: '',
                isFetching: false,
            };
        case    GET_HALL_INFO_FAIL:
            return {
                ...state,
                isFetching: false,
                error: true,
                message: action.payload.response ? action.payload.response.data.message : 'Нет связи с сервером'
            };
            
        case    HALL_INFO_UPDATE_DHCP:
            return {...state, hallInfo: { ...state.hallInfo, dhcp_enabled: state.hallInfo.dhcp_enabled ? 0 : 1}};
    
        case    HALL_INFO_UPDATE_ONOFF_HALL:
            return {
                ...state,
                hallInfo: {
                    ...state.hallInfo,
                    permission: state.hallInfo.permission ? 0 : 1
                }
            };
            
        case    HALL_INFO_UPDATE_PARTNER_HALL:
            return {
                ...state,
                hallInfo: {
                    ...state.hallInfo,
                    permission: state.hallInfo.permission ? 0 : 1
                }
            };
            
        default:
            return state;
    }
};

export default hallInfoReducer;

