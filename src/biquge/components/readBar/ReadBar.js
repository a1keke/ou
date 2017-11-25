
import React,{Component} from 'react';

import S from './readBar.scss';

export default class ReadBar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {bid,cid} = this.props;

        let area1 = cid == 1?
            (<a className="ui inverted blue button labeled icon">
                <i className={`left arrow icon ${S.blue}`}></i>没有上一章
            </a>):(<a className="ui inverted blue button labeled icon" href={`/biquge/${bid}/${cid*1-1}`}>
            <i className={`left arrow icon ${S.blue}`}></i>上一章
        </a>);

        return (
            <div className={`ui inverted segment ${S.mt}`}>
                {area1}
                <a className={`ui right labeled icon button inverted blue ${S.fr}`} href={`/biquge/${bid}/${cid*1+1}`}>
                    <i className="right arrow icon"></i>下一章
                </a>
            </div>
        );
    }
}