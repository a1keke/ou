import React,{Component} from 'react';
import S from './style.scss';
export default class ConnectList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={`ui very relaxed list four wide column animated ${S.mt0}`}>
                <h3 className="ui header dividing">
                    <i className={`send outline icon blue ${S.iconMiddle}`}></i>
                    <div className="content">其他社交</div>
                </h3>
                <div className="item">
                    <i className={`marker icon blue ${S.iconMiddle}`}></i>
                    <div className="middle aligned content">
                        <div className="header">address</div>
                        <div className="description">浙江·杭州</div>
                    </div>
                </div>
                <div className="item">
                    <i className={`qq icon blue ${S.iconMiddle}`}></i>
                    <div className="middle aligned content">
                        <div className="header">QQ</div>
                        <div className="description">569215376</div>
                    </div>
                </div>
                <div className="item">
                    <i className={`wechat icon blue ${S.iconMiddle}`}></i>
                    <div className="middle aligned content">
                        <div className="header">WeChat</div>
                        <div className="description">Kk56921576</div>
                    </div>
                </div>
                <div className="item">
                    <i className={`github icon blue ${S.iconMiddle}`}></i>
                    <div className="middle aligned content">
                        <div className="header">GitHub</div>
                        <div className="description">a1keke</div>
                    </div>
                </div>
                <div className="item">
                    <img className={`ui avatar image ${S.img}`} src="/static/resource/segmentfault.png" />
                    <div className="middle aligned content">
                        <div className="header">segmentfault</div>
                        <div className="description"><a href="https://segmentfault.com/u/ou_5927ed57c1b96">欧兜兜是素姀</a></div>
                    </div>
                </div>
                <div className="item">
                    <i className={`mail icon blue ${S.iconMiddle}`}></i>
                    <div className="middle aligned content">
                        <div className="header">mail</div>
                        <div className="description">569215376@qq.com</div>
                    </div>
                </div>
                <div className="item">
                    <i className={`weibo icon blue ${S.iconMiddle}`}></i>
                    <div className="middle aligned content">
                        <div className="header">weibo</div>
                        <div className="description"><a href="https://weibo.com/3982547511/profile?is_all=1">-waitingZzz</a></div>
                    </div>
                </div>
            </div>
        );
    }
}
