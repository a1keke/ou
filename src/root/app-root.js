import React,{Component} from 'react';
import ReactDOM from "react-dom";
import S from './style.scss';
class Root extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={`pusher ${document.body.clientWidth>750?S.pcIndex:S.webIndex}`} style={{height:`${document.body.clientHeight}px`}}>
                <div className="ui inverted vertical masthead center aligned segment" style={{position:'absolute',width:'100%'}}>
                    <div className="ui container">
                        <div className="ui large secondary inverted pointing menu">
                            <a className="item active">Home</a>
                            <a className="item" href='/diary'>Diary</a>
                            <a className="item" href='/biquge'>Book</a>
                            <a className="item" href='/kele'>Kele</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(
    <Root />,
    document.getElementById('root')
)