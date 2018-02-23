import React,{Component} from 'react';
import $ from 'jquery';
import accordion from 'semantic-ui/dist/semantic.js';
import json from './../../../../static/json/heroes.json';
import HeroList from './../../components/heroList/HeroList.js';
import QuestionList from './../../components/questionList/QuestionList.js';
import AddQuestion from './../../components/addQuestion/AddQuestion.js';
import Search from './../../components/search/Search.js';
export default class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            questionList:[]
        }
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
            this.setState({questionList:res.questionList})
        })
    }
    render(){
        return (
            <div className="ui accordion">
                <div className="title"><i className="dropdown icon"></i>英雄列表</div>
                <div className="content">
                    <HeroList {...json}></HeroList>
                </div>
                <div className="title"><i className="dropdown icon"></i>添加问题</div>
                <div className="content">
                    <AddQuestion></AddQuestion>
                </div>
                <div className="title"><i className="dropdown icon"></i>常见问题</div>
                <div className="content">
                    <QuestionList questionList={this.state.questionList}></QuestionList>
                </div>
                <div className="title"><i className="dropdown icon"></i>搜索问题</div>
                <div className="content">
                    <Search questionList={this.state.questionList}></Search>
                </div>
            </div>
        );
    }
}
