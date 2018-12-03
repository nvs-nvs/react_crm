import axios from 'axios';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(data) {
    return dispatch => {

        dispatch({
            type: LOGIN,
            payload: {}
        });

        return axios('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })
            .then(responce => {
                localStorage.setItem('token', responce.data.token);
                dispatch({
                    type:	`${LOGIN}_SUCCESS`,
                    payload: responce
                });
        },
            (error) => {
                dispatch({
                    type:	`${LOGIN}_FAIL`,
                    payload: error
                });
            }
            )
    }
}

export function logout(data) {
    return dispatch => {
        dispatch({
            type: LOGOUT,
            payload: {}
        });
    }
}
