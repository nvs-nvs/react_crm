import {
    GET_HALL_INFO_REQUEST,
    GET_HALL_INFO_SUCCESS,
    GET_HALL_INFO_FAIL,
} from '../actions/HallInfoActions';

const initialState = {
    clients: [],
    fetching: false,
    hallInfo: {}
};

export default function hallInfoReducer(state = initialState, action) {
    switch (action.type) {
        case    GET_HALL_INFO_REQUEST:
            return {...state, fetching: true};
        case    GET_HALL_INFO_SUCCESS:
            return {...state, clients: action.payload.clients, hallInfo:action.payload.hall_info, fetching: false};
        case    GET_HALL_INFO_FAIL:
            return {...state, fetching: false};
        default:
            return state;
    }
    
}

