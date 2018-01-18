import React,{Component} from 'react';
import {connect} from 'react-redux';
import S from './style.scss';
import MsgTextarea from './../../components/msgTextarea/MsgTextarea.js';
import ConnectList from './../../components/connectList/ConnectList.js';
import MsgList from './../../components/msgList/MsgList.js';
import ClickLoading from './../../components/clickLoading/ClickLoading.js';
import {fetchMsgList} from '../../redux/action/index.js';
class connectPage extends Component{
    constructor(props){
        super(props);
        this.clickLoading = this.clickLoading.bind(this);
    }
    componentDidMount(){
        if(this.props.msgList.length==0)
            this.clickLoading()
    }
    clickLoading(cb){
        let {msgList,nextPage,fetchMsgList} = this.props;
        fetchMsgList(nextPage,msgList,cb)
    }
    render(){
        let {msgList,nextPage} = this.props;
        return (
            <section className={`ui grid stackable vertically ${S.connectPage}`}>
                <div className="twelve wide column">
                    <MsgTextarea ></MsgTextarea>
                    <MsgList {...{msgList}}></MsgList>
                    <ClickLoading clickEvent={this.clickLoading} nextPage={nextPage}></ClickLoading>
                </div>
                <ConnectList></ConnectList>
            </section>
        );
    }
}
const ConnectPage = connect(state=>{
    return {
        msgList:state.msgReducer.msgList,
        nextPage:state.msgReducer.nextPage
    }
},dispatch=>{
    return {
        fetchMsgList:(nextPage,msgList,cb)=>dispatch(fetchMsgList(nextPage,msgList,cb))
    }
})(connectPage)
export default ConnectPage;