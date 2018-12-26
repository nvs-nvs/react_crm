import axios from 'axios/index';
import {config} from '../config';

export const GET_HALL_INFO_REQUEST = 'GET_HALL_INFO_REQUEST';
export const GET_HALL_INFO_SUCCESS = 'GET_HALL_INFO_SUCCESS';
export const GET_HALL_INFO_FAIL = 'GET_HALL_INFO_FAIL';

export function getHallInfo(hallId, isActive, vip){
    return (dispatch) => {
        dispatch({
            type: GET_HALL_INFO_REQUEST,
            payload: {fetching: true, hall_id: hallId},
        });
        
        return axios(`${config.api_url}/api/halls`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                hall_id: hallId,
                isActive,
                vip
            },
        }).then(response => {
                dispatch({
                    type: `GET_HALL_INFO_SUCCESS`,
                    payload: response,
                });
            },
            (error) => {
                dispatch({
                    type: `GET_HALL_INFO_FAIL`,
                    payload: error,
                });
            });
    };
}
