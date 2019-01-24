import axios from 'axios/index';
import {config} from '../config';

export const GET_CLIENT_INFO_REQUEST = 'GET_CLIENT_INFO_REQUEST';
export const GET_CLIENT_INFO_SUCCESS = 'GET_CLIENT_INFO_SUCCESS';
export const GET_CLIENT_INFO_FAIL = 'GET_CLIENT_INFO_FAIL';

export const CLIENT_INFO_UPDATE_REQUEST = 'CLIENT_INFO_UPDATE_REQUEST';
export const CLIENT_INFO_UPDATE_SUCCESS = 'CLIENT_INFO_UPDATE_SUCCESS';
export const CLIENT_INFO_UPDATE_SUCCESS_FAIL = 'CLIENT_INFO_UPDATE_SUCCESS_FAIL';

export function getClientInfo(clientSearchArray){

    return (dispatch) => {
        dispatch({
            type: GET_CLIENT_INFO_REQUEST,
            clients: {fetching: true, data: clientSearchArray},
        });

        return axios(`${config.api_url}/api/clients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: clientSearchArray,

        }).then(response => {
                dispatch({
                    type: `GET_CLIENT_INFO_SUCCESS`,
                    clients: response,
                });
            },
            (error) => {
                dispatch({
                    type: `GET_CLIENT_INFO_FAIL`,
                    clients: error,
                });
            });
    };
}

export function clientInfoUpdate(updatedRow){
    return (dispatch) => {
        dispatch({
            type: CLIENT_INFO_UPDATE_REQUEST,
        });

        return axios(`${config.api_url}/api/clients/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                updatedRow
            },
        }).then(response => {
                dispatch({
                    type: CLIENT_INFO_UPDATE_SUCCESS,
                    clients: response,
                });

            },
            (error) => {
                dispatch({
                    type: CLIENT_INFO_UPDATE_SUCCESS_FAIL,
                    clients: error,
                });
            });
    };
}
