import React,{Component} from 'react';
import $ from 'jquery';
import accordion from 'semantic-ui/dist/semantic.js';
import json from './../../../../static/json/heroes.json';
import HeroList from './../../components/heroList/HeroList.js';
export default class Index extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        $('.ui.accordion').accordion();
        fetch('/kele/getQuestionList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(res=>res.json()).then(res=>{
            console.log(res);
        })
    }
    render(){
        return (
            <div className="ui accordion">
                <div className="title"><i className="dropdown icon"></i>英雄列表</div>
                <div className="content">
                    <HeroList {...json}></HeroList>
                </div>
                <div className="title"><i className="dropdown icon"></i>常见问题</div>
                <div className="content">

                </div>
            </div>
        );
    }
}
