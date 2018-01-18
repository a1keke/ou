import React,{Component} from 'react';
import S from './style.scss';
export default class Msg extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {index,time,week,content,nickname,account} = this.props.msg;
        return (
            <div className="comment">
                    <span className="avatar">
                        <img src="/static/resource/e2cd6ca52f67d1d413c338602cb7f61d.jpg" />
                    </span>
                <div className="content">
                    <span className="author">{nickname}</span>
                    <div className="metadata">
                        <span className="date">{time}{week}</span>
                    </div>
                    <pre className={`text ${S.pre}`}>{content}</pre>
                </div>
            </div>
        );
    }
}
