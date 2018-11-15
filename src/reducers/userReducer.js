import { LOGIN, LOGOUT } from '../actions/AuthActions';
const initialState = {

};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case `${LOGIN}_SUCCESS`:
            return { ...state,  ...payload.data.user};
        case `${LOGIN}_FAIL`:
            localStorage.clear();
            return { ...initialState };
        case `${LOGOUT}_SUCCESS`:
            return { ...initialState };
        default:
            return state;
    }
}