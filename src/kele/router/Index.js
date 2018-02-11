import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import S from './index.scss';
import Index from './../view/index/Index.js';
import Detail from './../view/detail/Detail.js';
export default class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <BrowserRouter>
                <div className={S.m5}>
                    <Route path='/kele' component={Index} exact></Route>
                    <Route path='/kele/:name' component={Detail}></Route>
                </div>
            </BrowserRouter>
        );
    }
}
