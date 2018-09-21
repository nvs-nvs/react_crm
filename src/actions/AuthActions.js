import { LOGIN } from '../constants/AuthConstants';
import axios from 'axios';
import setAuthToken from '../helpers/setAuthToken';

export function login(data) {
    return dispatch => {
        return axios('http://slim.loc/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })
            .then(responce => {
                const token = responce.data.token;
                localStorage.setItem('token', token);
                setAuthToken(token);
                
        })
    }
}