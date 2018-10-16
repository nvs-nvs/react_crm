import axios from 'axios';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(data) {
    return dispatch => {
        
        dispatch({
            type: LOGIN,
            payload: {}
        });
        
        return axios('http://slim.loc/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })
            .then(responce => {
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