

import React,{Component} from 'react';

import ReactDOM from 'react-dom';

import Header from './components/header/header.js';

import DiaryTextarea from './components/diaryTextarea/DiaryTextarea.js';

import DiaryList from './components/diaryList/diaryList.js';

ReactDOM.render(
    <div>
        <Header/>
        <DiaryTextarea/>
        <DiaryList/>
    </div>,
    document.getElementById('root')
)