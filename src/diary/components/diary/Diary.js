import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import S from './style.scss';

export default class Diary extends Component{
    constructor(props){
        super(props);
    }
    render(){

        let {diary,isDetail} = this.props;

        let {index,time,week,title,content} = diary;

        let temp = '';

        let _content = content.map((ele,i)=>{
            if(ele.attr === 1){
                return <p key={i}>{ele.part}</p>
            }else if(ele.attr === 2){
                return <pre key={i} className={S.pre}><code className={S.code}>{ele.part}</code></pre>
            }else if(ele.attr === 3){
                temp = '';
                temp = temp+ele.part +'\n';
            }else if(ele.attr === 5){
                temp = temp+ele.part +'\n';
            }else if(ele.attr === 4){
                temp = temp+ele.part +'\n';
                return <pre key={i} className={S.pre}><code className={S.code}>{temp}</code></pre>
            }else if(ele.attr === 6){
                return <img src={ele.part} key={i}/>
            }
        }).filter(ele=>ele);

        _content = content.length > 8 && !isDetail?(
            <div className={`${S.mh10} ${S.content}`}>
                {_content}
                <div className={S.mask}></div>
            </div>
        ):(
            <div className={S.content}>{_content}</div>
        );

        let moreIcon = content.length > 8 && !isDetail?(
            <Link to={`/diary/${title}`} className="ui attached label"><i className="large search icon"></i></Link>
        ):(null);

        return (
            <div className="event">
                <div className={`label ${S.w5}`}>
                    <img src="/static/resource/e2cd6ca52f67d1d413c338602cb7f61d.jpg" />
                </div>
                <div className={`content ${S.w}`}>
                    <div className="summary">
                        <Link to={`/diary/${title}`}>{title}</Link>
                        <div className="date">{time}{week}</div>
                    </div>
                    {_content}
                    {moreIcon}
                </div>
            </div>
        );
    }
}
