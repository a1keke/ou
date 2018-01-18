import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {showToast} from '../../redux/action/index.js';
import {connect} from 'react-redux';
import S from './style.scss';
class msgTextarea extends Component{
    constructor(props){
        super(props);
        this.state = {
            content:''
        }
        this.changeContent = this.changeContent.bind(this);
        this.saveMsg = this.saveMsg.bind(this);
        this.tabEvent = this.tabEvent.bind(this);
    };
    changeContent(ev){this.setState({content:ev.target.value})};
    //输入框支持tab键
    tabEvent(ev){
        if(ev.keyCode===9){
            let _content = this.refs.content;
            let position=_content.selectionStart+4;
            _content.value=_content.value.substr(0,_content.selectionStart)+'    '+_content.value.substr(_content.selectionStart);
            _content.selectionStart=position;
            _content.selectionEnd=position;
            _content.focus();
            this.setState({content:_content.value})
            ev.preventDefault();
        }
    }
    //提交diary
    saveMsg(){

        let {_account,showToast} = this.props;
        let {content} = this.state;
        if(content ===''){
            showToast('留言内容不能为空');
            return false;
        }
        if(content.length>200){
            showToast(`留言内容不能大于200字符,当前为${content.length}字符`);
            return false;
        }

        let init = {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body:JSON.stringify({content,account:_account})
        }

        fetch('/diary/saveMsg',init).then(res=>{
            return res.json();
        }).then(res=>{
            let {code} = res;
            code === 1? showToast('保存成功，请刷新本页'):showToast(res.err);

        }).catch(res=>{
            showToast('保存失败');
        })

    }

    render(){
        let {changeContent,saveMsg,tabEvent,changeImage,deleteImage} = this;
        let {_account} = this.props;
        let {content,imagesValue,images} = this.state;
        let {showToast} = this.props;
        //未登录不展示框，提示登录
        let formDom = _account?(
            <form className={`ui reply form ${S.mb1}`} encType="multipart/form-data" ref="imagesForm">
                <div className="field">
                    <textarea value={content} onChange={changeContent} onKeyDown={tabEvent} ref="content"></textarea>
                </div>
                <div className="ui blue labeled submit icon button"
                     onClick={saveMsg}
                >
                    <i className="icon edit"></i>
                    save
                </div>
            </form>
        ):(
            <div className="ui info message">
                <div className="header">你还未登录，请先
                    <Link to='/diary/user/login'>登录</Link>
                    or
                    <Link to='/diary/user/signup'>注册</Link>
                </div>
            </div>
        );

        return (
            <div>
                <h3 className="ui header dividing">
                    <i className="write icon blue"></i>
                    <div className="content">本站留言</div>
                </h3>
                {formDom}
            </div>
        );
    }
}
const MsgTextarea = connect(state=>{
    return{
        _account:state.fetchReducer.account
    }
},dispatch=>{
    return {
        showToast:(text,btnEvent)=>dispatch(showToast(text,btnEvent))
    }
})(msgTextarea);
export default MsgTextarea;