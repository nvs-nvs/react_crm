import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import hallInfoReducer from './reducers/hallInfoReducer';
import {Provider} from 'react-redux';
import {reduxTokenAuthReducer} from 'redux-token-auth';
import setAuthToken from './helpers/setAuthToken';

const allReducers = combineReducers({
    reduxTokenAuth: reduxTokenAuthReducer,
    hallInfo: hallInfoReducer,
});
const allEnhancers = compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension(),
);

const store = createStore(allReducers, {}, allEnhancers);

setAuthToken(localStorage.token);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

