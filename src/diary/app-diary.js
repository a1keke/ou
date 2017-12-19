
import ReactDOM from 'react-dom';

import {BrowserRouter,Route} from 'react-router-dom';

import {createStore,applyMiddleware,combineReducers} from 'redux';

import {Provider} from 'react-redux';

import thunk from 'redux-thunk';

import App from './router/Index.js';


import 'whatwg-fetch';

import 'promise-polyfill';

import * as reducer from './redux/reducer/Index.js';
const store =  createStore(combineReducers(reducer),applyMiddleware(thunk));
store.subscribe(() => { //监听state变化
    console.log(store.getState())
});


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)