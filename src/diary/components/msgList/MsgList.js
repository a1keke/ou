import React,{Component} from 'react';
import Msg from './../msg/Msg.js';
export default class MsgList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {msgList} = this.props;
        let msgCon = msgList.map((ele,i)=>{
            return <Msg {...{msg:ele,key:i}}/>
        })
        return (
            <div className="ui threaded comments">
                {msgCon}
            </div>
        );
    }
}