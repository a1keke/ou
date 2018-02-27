import React,{Component} from 'react';

import S from './bookList.scss';

import 'whatwg-fetch';

import 'promise-polyfill';

export default class BookList extends Component{
    constructor(props){
        super(props);
        this.state = {
            bookList :[]
        }
    }

    componentDidMount(){
        fetch('/biquge/interface/getAllBooks')
            .then(res=>{
                return res.json();
            }).then(bookList=>{
                if(bookList.code)
                    this.setState({bookList:bookList.allBooks})
            })
    }

    render(){
        let {bookList}= this.state;
        let item = bookList.map((ele,i)=>{

            return (
                <div className="item" key={i}>
                    <a className={`content ${S.disBlock}`} href={`/biquge/${ele.index}`}>
                        <div className="header">{ele.name}</div>
                    </a>
                </div>
            )

        })
        return (
            <div className={`ui inverted segment ${S.mt}`}>
                <div className="ui inverted relaxed divided list ">
                    {item}
                </div>
            </div>
        );
    }
}
