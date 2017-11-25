
import {Component} from 'react';

import S from './style.scss';

import Validation from '../../common/util/validation';

export default class SignInPanel extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName : "",
            passWord : "",
            userNameErr : false,
            passWordErr : false

        };

        this.userNameChange = this.userNameChange.bind(this);

        this.passWordChange = this.passWordChange.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.validator = new Validation();

        this.validator.addByValue('userName', [
            {strategy: 'isEmpty', errorMsg: '用户名不能为空'},
            {strategy: 'hasSpace', errorMsg: '用户名不能有空格'},
            {strategy: 'maxLength:6', errorMsg: '最长为6'}
        ]);

        this.validator.addByValue('passWord', [
            {strategy: 'isEmpty', errorMsg: '密码不能为空'},
            {strategy: 'hasSpace', errorMsg: '密码不能有空格'},
            {strategy: 'maxLength:6', errorMsg: '最长为6'}

        ]);

    }

    userNameChange(ev){

        let msg = this.validator.valiOneByValue('userName',ev.target.value);

        this.setState({
            userName:ev.target.value,
            userNameErr: msg
        })
    }

    passWordChange(ev){

        let msg = this.validator.valiOneByValue('passWord',ev.target.value);

        this.setState({
            passWord:ev.target.value,
            passWordErr: msg
        })
    }

    onSubmit(ev){

        ev.preventDefault();

        ev.stopPropagation();

        let {userName,passWord} = this.state;

        let userNameErr = this.validator.valiOneByValue('userName',userName);

        let passWordErr = this.validator.valiOneByValue('passWord',passWord);

        this.setState({
            userNameErr,passWordErr
        });

        let {signInAjax} = this.props;

        if(!userNameErr && !passWordErr){
            signInAjax({
                username : userName,
                passw : passWord
            });
        }

    }

    componentWillUnmount(){
        this.props.clearState();
    }

    render(){

        let {userNameChange,passWordChange,onSubmit} = this;

        let {userName,passWord,userNameErr,passWordErr} = this.state;

        let {signInMsg} = this.props;

        let retInfo = null;

        if(signInMsg && signInMsg.code !== 0) {
            console.log(signInMsg.code);
            retInfo = (
                <div className="ui message error">
                    <p>{signInMsg.msg}</p>
                </div>
            );
        }


        let userNameMsg = userNameErr?(<p className={S.err}>{userNameErr}</p>) : null;

        let passWordMsg = passWordErr?(<p className={S.err}>{passWordErr}</p>):null;

        return (
            <div className={S.sign_panel}>
                {retInfo}
                <form
                    className="ui form"
                >
                    <div className={`field ${userNameErr? 'error':''}`}>
                        <input
                            type="text"
                            placeholder="用户名"
                            ref="nameDom"
                            value={userName}
                            onChange={userNameChange}
                        />
                        {userNameMsg}
                    </div>
                    <div className={`field ${passWordErr?'error':''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            ref="passwDom"
                            value = {passWord}
                            onChange = {passWordChange}
                        />
                        {passWordMsg}
                    </div>
                    <div className="field">
                        <button type="submit"
                                className="ui button fluid primary"
                                onClick={onSubmit}
                        >登录</button>
                    </div>
                </form>
            </div>
        );
    }
}