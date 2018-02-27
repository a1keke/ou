import React,{Component} from 'react';

import S from './chapterList.scss';

import 'whatwg-fetch';

import 'promise-polyfill';

export default class ChapterList extends Component{
    constructor(props){
        super(props);
        this.state = {
            chapterList :[]
        }
    }
    componentWillReceiveProps(props){
        let {bid} = props;
        fetch('/biquge/interface/getChaptersByBid?bid='+bid)
            .then(res=>{
                return res.json();
            })
            .then(res=>{
                this.setState({chapterList:res.chapters})
            }).catch(err=>{
                console.log(err);
        })
    }
    render(){
        let {bid} = this.props;
        let {chapterList}= this.state;

        let item = chapterList.map((ele,i)=>{

            return (
                <div className="item" key={i}>
                    <a className={`content ${S.disBlock}`} href={`/biquge/${bid}/${ele.index}`}>
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
