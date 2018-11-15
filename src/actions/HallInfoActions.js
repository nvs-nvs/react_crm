import {LOGIN} from './AuthActions';
import axios from 'axios/index';

export	const	GET_HALL_INFO_REQUEST	=	'GET_HALL_INFO_REQUEST';
export	const	GET_HALL_INFO_SUCCESS	=	'GET_HALL_INFO_SUCCESS';
export	const	GET_HALL_INFO_FAIL	=	'GET_HALL_INFO_FAIL';
export	const	HALL_INFO_CHANGE_INPUT	=	'HALL_INFO_CHANGE_INPUT';

export function changeHallId(hallId){
    return (dispatch) => {
        dispatch({
            action: HALL_INFO_CHANGE_INPUT,
            payload: hallId
        });
    };
}

export function getHallInfo(hallId){
    return (dispatch) => {
        dispatch({
            type: GET_HALL_INFO_REQUEST,
            payload: {fetching: true, hall_id: hallId},
        });
    
        return axios('http://slim.loc/api/clients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                hall_id: hallId
            },
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
