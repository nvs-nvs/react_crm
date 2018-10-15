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

const allReducers = combineReducers({
    hallInfo: hallInfoReducer,
    user: userReducer,
    auth: authReducer,
});
const allEnhancers = compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension(),
);

const store = createStore(allReducers, {}, allEnhancers);

const setupInterceptors = function (store) {
    axios.interceptors.response.use(
        response => response,
        error => {
            const { response: { status } } = error;
            if (status === 401 || status === 403) {
                localStorage.clear();
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
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

