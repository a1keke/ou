import React,{Component} from 'react';
import 'whatwg-fetch';
import 'promise-polyfill';
import ChapterList from './../../components/chapterList/ChapterList.js';
import Header from './../../components/header/Header.js';

export default class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            bookname:'',
            bid:''
        }
    }

    componentDidMount(){
        let pathname = window.location.pathname;
        let bidIndex = pathname.lastIndexOf('/')+1;
        let bid = pathname.substring(bidIndex,pathname.length);
        fetch('/biquge/interface/getBookName?bid='+bid)
            .then(res=>{
                return res.json();
            })
            .then(res=>{
                this.setState({bookname:res.bookname,bid})
            }).catch(err=>{
            console.log(err);
        })
    }

    render(){
        let {bookname,bid} = this.state;
        return (
            <div>
                <Header {...{bookname,bid}}/>
                <ChapterList {...{bookname,bid}}/>
            </div>
        );
    }
}
