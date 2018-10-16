import {LOGIN} from './AuthActions';
import axios from 'axios/index';

export	const	GET_HALL_INFO_REQUEST	=	'GET_HALL_INFO_REQUEST';
export	const	GET_HALL_INFO_SUCCESS	=	'GET_HALL_INFO_SUCCESS';
export	const	GET_HALL_INFO_FAIL	=	'GET_HALL_INFO_FAIL';

export function getHallInfo(data){
    return (dispatch) => {
        dispatch({
            type: GET_HALL_INFO_REQUEST,
            payload: {fetching: true},
        });
    
        return axios('http://slim.loc/api/clients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })
        .then(responce => {
                dispatch({
                    type:	`GET_HALL_INFO_SUCCESS`,
                    payload: responce
                });
            },
            (error) => {
                dispatch({
                    type:	`GET_HALL_INFO_FAIL`,
                    payload: error
                });
            });
    };
}
