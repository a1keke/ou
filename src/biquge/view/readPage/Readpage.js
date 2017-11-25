
import React,{Component} from 'react';
import 'whatwg-fetch';
import 'promise-polyfill';
import Header from './../../components/header/Header.js';
import ChapterContent from './../../components/chapterContent/ChapterContent.js';
import ReadBar from './../../components/readBar/ReadBar.js';
export default class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            bid:'',
            bookname:'',
            cid:'',
            chaptername:'',
            chaptercontent:''

        }
    }
    componentDidMount(){
        let pathname = window.location.pathname;
        let arr = pathname.split('/')
        let bid = arr[arr.length-2];
        let cid = arr[arr.length-1];
        fetch('/biquge/interface/getBookName?bid='+bid)
            .then(res=>{
                return res.json();
            })
            .then(res=>{
                if(res.code)
                    this.setState({bookname:res.bookname,bid,cid});
            }).catch(err=>{
            console.log(err);
        })
        fetch('/biquge/interface/getChapter?bid='+bid+'&cid='+cid)
            .then(res=>{
                return res.json();
            })
            .then(res=>{
                if(res.code)
                    this.setState({chaptername:res.chaptername,chaptercontent:res.chaptercontent})
                else 
                    console.log(res.err);
            }).catch(err=>{
                console.log(err);
        })

    }

    render(){
        let {bid,cid,bookname,chaptername,chaptercontent} = this.state;
        return (
            <div>
                <Header {...{bookname,bid,chaptername}}/>
                <ChapterContent {...{chaptername,chaptercontent}}/>
                <ReadBar {...{bid,cid}}/>
            </div>
        );
    }
}