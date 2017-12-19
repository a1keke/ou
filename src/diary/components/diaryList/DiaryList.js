import React,{Component} from 'react';
import Diary from './../diary/Diary.js';

import S from './style.scss';

import 'whatwg-fetch';

import 'promise-polyfill';
export default class DiaryList extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        let {diaryList} = this.props;
        let diaryCon = diaryList.map((ele,i)=>{
            return <Diary {...{diary:ele,isDetail:false,key:i}}/>
        })

        return (
            <div className={`ui feed ${S.m}`}>
                {diaryCon}
            </div>
        );
    }
}
