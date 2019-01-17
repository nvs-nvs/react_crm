import axios from 'axios/index';
import {config} from '../config';

export const GET_HALL_INFO_REQUEST = 'GET_HALL_INFO_REQUEST';
export const GET_HALL_INFO_SUCCESS = 'GET_HALL_INFO_SUCCESS';
export const GET_HALL_INFO_FAIL = 'GET_HALL_INFO_FAIL';

export const HALL_INFO_UPDATE_REQUEST = 'HALL_INFO_UPDATE_REQUEST';
export const HALL_INFO_UPDATE_SUCCESS = 'HALL_INFO_UPDATE_SUCCESS';
export const HALL_INFO_UPDATE_FAIL = 'HALL_INFO_UPDATE_SUCCESS_FAIL';

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

export function hallInfoUpdate(updatedRow, index){
    return (dispatch) => {
        dispatch({
            type: HALL_INFO_UPDATE_REQUEST,
            payload: {isUpdating: true},
        });
        
        return axios(`${config.api_url}/api/halls/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                updatedRow
            },
        }).then(response => {
                dispatch({
                    type: HALL_INFO_UPDATE_SUCCESS,
                    payload: {response, updatedRow, index},
                });
            },
            (error) => {
                dispatch({
                    type: HALL_INFO_UPDATE_FAIL,
                    payload: error
                });
            });
    };
}
