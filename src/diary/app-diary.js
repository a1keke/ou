


import React,{Component} from 'react';

import ReactDOM from 'react-dom';

import Header from './components/header/Header.js';

import Index from './view/index/Index.js';

import DetailDiary from './view/detailDiary/DetailDiary.js';

import {BrowserRouter,Route} from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter >
        <div>
            <Route path="/diary" component={Header} />
            <Route path="/diary" exact component={Index}/>
            <Route path="/diary/:title" component={DetailDiary}/>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
)