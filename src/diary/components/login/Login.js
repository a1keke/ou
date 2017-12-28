import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchLogin,showToast} from './../../redux/action/index.js';
let  validator = require('../../../../util/validator.js').validator;
import S from './style.scss';
class login extends Component{
    constructor(props){
        super(props);
        this.state = {
            account : '',
            accountErr : '',
            password : '',
            passwordErr: '',
        }
        this.validator = validator;
        this.accountChange = this.accountChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.sumbitLogin = this.sumbitLogin.bind(this);
    }
    accountChange(ev){
        let msg = this.validator.valiOneByValue('account',ev.target.value);

        this.setState({
            account:ev.target.value,
            accountErr: msg
        })
    }
    passwordChange(ev){
        let msg = this.validator.valiOneByValue('password',ev.target.value);

        this.setState({
            password:ev.target.value,
            passwordErr: msg
        })
    }
    sumbitLogin(){
        let {account,accountErr,password,passwordErr} = this.state;
        let {showToast,fetchLogin} = this.props;
        if(accountErr&&passwordErr){
            showToast('格式错误，请更正')
            return false;
        }
        if(!account || !password){
            showToast('请完成所有必填项')
            return false;
        }
        fetchLogin({account,password});
    }
    render(){
        let {_nickname} = this.props;
        if(_nickname){
            return (<Redirect to="/diary" />)
        }
        let {accountChange,passwordChange,sumbitLogin} = this;
        let {account,accountErr,password,passwordErr} = this.state;

        return (
            <div className="ui middle aligned center aligned grid">
                <div className={`column ${S.column}`}>
                    <h2 className="ui blue image header">
                        <div className="content">
                            Log-in to your account
                        </div>
                    </h2>
                    <form className="ui large form">
                        <div className="ui stacked segment">
                            <div className={`field ${accountErr?'error':''}`}>
                                <div className="ui left icon input">
                                    <i className="user icon blue"></i>
                                    <input
                                        type="text"
                                        name="account"
                                        placeholder="account"
                                        value={account}
                                        onChange={accountChange}
                                        maxLength='15'
                                    />
                                </div>
                                {accountErr?(<p className={S.error}>{accountErr}</p>):(null)}
                            </div>
                            <div className={`field ${passwordErr?'error':''}`}>
                                <div className="ui left icon input">
                                    <i className="lock icon blue"></i>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        value={password}
                                        onChange={passwordChange}
                                        maxLength='15'
                                    />
                                </div>
                                {passwordErr?(<p className={S.error}>{passwordErr}</p>):(null)}
                            </div>
                            <div className="ui fluid large blue submit button" onClick={sumbitLogin}>Login</div>
                        </div>
                    </form>
                    <div className="ui message">
                        New to us? <Link to="/diary/user/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        );
    }
}
const Login = connect(state=>{
    return {
        _nickname:state.fetchReducer.nickname
    }
},dispatch=>{
    return {
        fetchLogin:info=>{dispatch(fetchLogin(info))},
        showToast:(text,btnEvent)=>dispatch(showToast(text,btnEvent))
    }
})(login)

export default Login;
