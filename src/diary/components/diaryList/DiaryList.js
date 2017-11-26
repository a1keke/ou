import React,{Component} from 'react';
import Diary from './../diary/Diary.js';

import S from './style.scss';

import 'whatwg-fetch';

import 'promise-polyfill';
export default class DiaryList extends Component{
    constructor(props){
        super(props);
        this.state = {
            diary :[]
        }
    }
    
    componentDidMount(){
        fetch('/diary/getAllDiary').then(res=>{
            return res.json();
        }).then(res=>{
            this.setState({diary:res.diary})
        }).catch(res=>{
            console.log(res);
        })
    }

    render(){
        let {diary} = this.state;
        
        let diaryCon = diary.map((ele,i)=>{
            return <Diary {...{diary:ele,key:i}}/>
        })

        return (
            <div className={`ui feed ${S.m}`}>
                <div>&nbsp;&nbsp;</div>
                {diaryCon}
            </div>
        );
    }
}
