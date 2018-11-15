import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import hallInfoReducer from './reducers/hallInfoReducer';
import userReducer from './reducers/userReducer';
import authReducer from './reducers/authReducer';
import {Provider} from 'react-redux';
import axios from 'axios';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const allReducers = combineReducers({
    hallInfo: hallInfoReducer,
    user: userReducer,
    auth: authReducer,
});
const allEnhancers = compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension(),
);

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(persistedReducer, {}, allEnhancers);
const persistor = persistStore(store);

const setupInterceptors = function (store) {
    axios.interceptors.request.use(function (config) {
        let token = localStorage.getItem('token');
        config.headers = {...config.headers, 'X-Auth-Token':'bearer ' + token};
        config.params = {country: 'ru'};
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
    
    axios.interceptors.response.use(
        response => {
            return response
        },
        error => {
            const { response: { status } } = error;
            if (status === 401 || status === 403) {
                window.localStorage.clear();
                persistor.purge();
                if (!window.location.href.split('/').includes('login')) {
                    window.location.reload();
                }
            }
            return Promise.reject(error);
        }
    );
}

setupInterceptors(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={ persistor } >
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>, document.getElementById('root'));

