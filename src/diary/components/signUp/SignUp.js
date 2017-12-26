import React,{Component} from 'react';
import S from './style.scss';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {fetchSignUp,showToast} from './../../redux/action/index.js';
let  validator = require('../../../../util/validator.js').validator;
class signUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            nickname : '',
            nicknameErr :'',
            account : '',
            accountErr : '',
            password : '',
            passwordErr: '',
            confirm : '',
            confirmErr : '',
            email : '',
            emailErr : ''
        }
        this.validator = validator;
        this.nicknameChange = this.nicknameChange.bind(this);
        this.accountChange = this.accountChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.confirmChange = this.confirmChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this);

    }
    nicknameChange(ev){
        let msg = this.validator.valiOneByValue('nickname',ev.target.value);

        this.setState({
            nickname:ev.target.value,
            nicknameErr: msg
        })
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
    confirmChange(ev){
        let {password} = this.state;

        this.setState({
            confirm:ev.target.value,
            confirmErr: ev.target.value===password?'':'两次密码不一致'
        })
    }
    emailChange(ev){
        let msg = this.validator.valiOneByValue('email',ev.target.value);

        this.setState({
            email:ev.target.value,
            emailErr: msg
        })
    }
    submitSignUp(){
        let {nickname,nicknameErr,account,accountErr,password,passwordErr,confirm,confirmErr,email,emailErr} = this.state;
        let {showToast,fetchSignUp} = this.props;
        let {appVersion,platform} = navigator;
        if(nicknameErr&&accountErr&&passwordErr&&confirmErr&&emailErr){
            showToast('格式错误，请更正')
            return false;
        }
        if(!nickname || !account || !password || !confirm || !email){
            showToast('请完成所有必填项')
            return false;
        }
        fetchSignUp({nickname,account,password,email,appVersion,platform});
    }
    render(){
        let {isLogin} = this.props;
        if(isLogin){
            return (<Redirect to="/diary" />)
        }
        let {nicknameChange,accountChange,passwordChange,confirmChange,emailChange,submitSignUp} = this;
        let {nickname,nicknameErr,account,accountErr,password,passwordErr,confirm,confirmErr,email,emailErr} = this.state;
        return (
            <div className="ui middle aligned center aligned grid">
                <div className={`column ${S.column}`}>
                    <h2 className="ui blue  image header">
                        <div className="content">
                            Sign Up Your Account
                        </div>
                    </h2>
                    <form className="ui large form">
                        <div className="ui stacked segment">
                            <div className={`field ${nicknameErr?'error':''}`}>
                                <div className="ui left icon input">
                                    <i className="user icon blue"></i>
                                    <input
                                        type="text"
                                        name="nickname"
                                        placeholder="nickname"
                                        value={nickname}
                                        onChange={nicknameChange}
                                        maxLength='9'
                                    />
                                </div>
                                {nicknameErr?(<p className={S.error}>{nicknameErr}</p>):(null)}
                            </div>
                            <div className="field">
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
                            <div className="field">
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
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon blue"></i>
                                    <input
                                        type="password"
                                        placeholder="confirm password"
                                        value={confirm}
                                        onChange={confirmChange}
                                    />
                                </div>
                                {confirmErr?(<p className={S.error}>{confirmErr}</p>):(null)}
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="mail icon blue"></i>
                                    <input
                                        type="text"
                                        name='email'
                                        placeholder="email"
                                        value={email}
                                        onChange={emailChange}
                                    />
                                </div>
                                {emailErr?(<p className={S.error}>{emailErr}</p>):(null)}
                            </div>
                            <div className="ui fluid large blue submit button" onClick={submitSignUp}>Sign Up!</div>
                        </div>
                        <div className="ui error message"></div>
                    </form>
                </div>
            </div>
        );
    }
}
const SignUp = connect(state=>{
    return {
        isLogin:state.fetchReducer.isLogin
    }
},dispatch=>{
    return {
        fetchSignUp:info=>{dispatch(fetchSignUp(info))},
        showToast:(text,btnEvent)=>dispatch(showToast(text,btnEvent))
    }
})(signUp);
export default SignUp;