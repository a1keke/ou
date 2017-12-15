import React,{Component} from 'react';

import ReactDOM from 'react-dom';

import Header from './components/header/Header.js';

import Index from './view/index/Index.js';

import DetailDiary from './view/detailDiary/DetailDiary.js';

import {BrowserRouter,Route} from 'react-router-dom';

import 'whatwg-fetch';

import 'promise-polyfill';
class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin:false
        }
    }

    log(target,key,des){

    }
    componentDidMount(){
        let {appVersion,platform} = navigator;
        fetch('/base',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({appVersion,platform})
        }).then(res=>res.json()).then(res=>{
            console.log('base:'+res.code);
        }).catch(e=>{
            console.log('base:'+e);
        })

    }
    render(){
        return (
            <BrowserRouter >
                <div>
                    <Route path="/diary" component={Header} />
                    <Route path="/diary" exact component={Index}/>
                    <Route path="/diary/:title" component={DetailDiary}/>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)