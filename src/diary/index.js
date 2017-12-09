

import React,{Component} from 'react';

import ReactDOM from 'react-dom';

import Header from './components/header/header.js';

import DiaryTextarea from './components/diaryTextarea/DiaryTextarea.js';

import DiaryList from './components/diaryList/diaryList.js';
import Diary from './components/diary/diary.js';

import {BrowserRouter,Route} from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter >
        <div>
            <Route path="/diary" component={Header} />
            <Route path="/diary" exact component={DiaryTextarea} />
            <Route path="/diary" exact component={DiaryList} />
            <Route path="/diary/:diaryname" component={Diary}/>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
)