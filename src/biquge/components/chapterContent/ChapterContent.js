import React,{Component} from 'react';

import S from './chapterContent.scss';


export default class ChapterContent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {chaptercontent} = this.props;
        return (
            <div className={`ui inverted segment ${S.mt}`}  dangerouslySetInnerHTML={{__html:chaptercontent}}></div>
        );
    }
}