
import React,{Component} from "react";

import ReactDOM from "react-dom";

import {BrowserRouter as Router,Route} from "react-router-dom";

import Frame from './layout/frame/Frame';

ReactDOM.render(
    <Router>
        <Route path="/jianshu" component={Frame} />
    </Router>,
    document.getElementById('root')
);
