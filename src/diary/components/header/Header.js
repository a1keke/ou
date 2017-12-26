import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import S from './header.scss';

class header extends Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps,nextState){
        return !(JSON.stringify(nextProps.isLogin)===JSON.stringify(this.props.isLogin)&&JSON.stringify(nextProps.nickname)===JSON.stringify(this.props.nickname))

    }
    render(){
        let {isLogin,nickname} = this.props;
        return (
            <h2 className={`ui center aligned icon header ${S.mt}`}>
                <i className={`circular icon ${S.header}`}></i>
                <p className={`${S.tac}`}>
                    <span className={nickname?S.mr1:''}>{nickname}</span>
                    <Link to="/diary/user/login">
                        <i
                            className={`circular sign in icon ${isLogin?'':'inverted blue'} large link `}
                            title={`${isLogin?'logout':'login'}`}
                        ></i>
                    </Link>
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
})(header)
export default Header;