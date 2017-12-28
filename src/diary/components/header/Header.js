import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import S from './header.scss';
import {fetchLogout,showToast} from './../../redux/action/index.js';

class header extends Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps,nextState){
        return JSON.stringify(nextProps.nickname)!==JSON.stringify(this.props.nickname)

    }
    render(){
        let {nickname,fetchLogout,showToast} = this.props;
        let btn = nickname?(
            <i
                className='circular sign in icon large link'
                title='logout'
                onClick={()=>{
                    showToast('确定要退出吗？',fetchLogout)
                }}
            ></i>
        ):(<Link to="/diary/user/login">
            <i
                className='circular sign in icon inverted blue large link'
                title='login'
            ></i>
        </Link>);
        return (
            <h2 className={`ui center aligned icon header ${S.mt}`}>
                <i className={`circular icon ${S.header}`}></i>
                <p className={`${S.tac}`}>
                    <span className={nickname?S.mr1:''}>{nickname?nickname:''}</span>
                    {btn}
                </p>
            </h2>
        );
    }
}
const Header = connect(state=>{
    return {
        isLogin:state.fetchReducer.isLogin,
        nickname:state.fetchReducer.nickname
    }
},dispatch=>{
    return {
        fetchLogout:()=>dispatch(fetchLogout()),
        showToast:(text,btnEvent)=>dispatch(showToast(text,btnEvent))
    }
})(header)
export default Header;