
import React,{Component} from 'react';
import Diary from './../diary/Diary.js';
import {Redirect} from 'react-router-dom';
import S from './style.scss';

import 'whatwg-fetch';

import 'promise-polyfill';
export default class DiaryList extends Component{
    constructor(props){
        super(props);
        this.state = {
            diary :null,
            status:1
        }
    }

    componentDidMount(){
        let {title} = this.props;
        fetch('/diary/getDiary',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({title})
        }).then(res=>res.json()).then(res=>{
            res.code?this.setState({diary:res.diary}):this.setState({status:0});
        })
    }

    render(){
        let {diary,status} = this.state;
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
