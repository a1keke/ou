

import React,{Component} from 'react';

import ReactDOM from 'react-dom';


import DiaryTextarea from '../../components/diaryTextarea/DiaryTextarea.js';

import DiaryList from '../../components/diaryList/DiaryList.js';


export default class Index extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
          <div>
              <DiaryTextarea/>
              <DiaryList/>
          </div>
        );
    }
}