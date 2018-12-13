import { config } from '../config';
import axios from 'axios';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(data) {
    return dispatch => {
        dispatch({
            type: LOGIN,
            payload: {}
        });

        return axios(`${config.api_url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        data
        })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                dispatch({
                    type:	`${LOGIN}_SUCCESS`,
                    payload: response
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
