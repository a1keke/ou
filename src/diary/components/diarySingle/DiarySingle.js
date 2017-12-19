
import React,{Component} from 'react';
import Diary from './../diary/Diary.js';
import {Redirect} from 'react-router-dom';
import S from './style.scss';
export default class DiaryList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {diary,status} = this.props;
        //没找到这篇文章，回到首页
        if(!status){
            return <Redirect to='/diary'/>
        }
        let diaryCon = diary?(<Diary {...{diary,isDetail:true}} />):null;
        return (
            <div className={`ui feed ${S.m}`}>
                {diaryCon}
            </div>
        );
    }
}


