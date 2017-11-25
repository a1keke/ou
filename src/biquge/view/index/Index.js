import React,{Component} from 'react';
import BookList from './../../components/bookList/BookList.js';
import Header from './../../components/header/Header.js';
export default class Index extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Header />
                <BookList/>
            </div>
        );
    }
}
