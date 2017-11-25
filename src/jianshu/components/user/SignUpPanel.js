import {Component} from 'react';

import S from './style.scss';

import Validation from '../../common/util/validation';


export default class  extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName : "",
            passWord : "",
            cfPass : "",
            userNameErr : false,
            passWordErr : false,
            cfPassErr : false


        };

        this.userNameChange = this.userNameChange.bind(this);

        this.passWordChange = this.passWordChange.bind(this);

        this.cfPassChange = this.cfPassChange.bind(this);

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

        this.validator.addByValue('cfPass', [
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

        let {cfPassErr} = this.state;

        this.setState({
            passWord:ev.target.value,
            passWordErr: msg
        })
        if(cfPassErr){
            this.cfPassChange();
        }
    }

    cfPassChange(){
        let {passwDom,cfPassDom} = this.refs;

        let cfPassErr = passwDom.value === cfPassDom.value ?'':"密码不一致";

        this.setState({
            cfPass : cfPassDom.value,
            cfPassErr
        })
    }

    onSubmit(ev){

        ev.preventDefault();

        ev.stopPropagation();

        let {userName,passWord,cfPass} = this.state;

        let userNameErr = this.validator.valiOneByValue('userName',userName);

        let passWordErr = this.validator.valiOneByValue('passWord',passWord);

        let cfPassErr = passWord === cfPass ?'':"密码不一致";

        this.setState({
            userNameErr,passWordErr,cfPassErr
        });

        let {signUpAjax} = this.props;

        if(!userNameErr && !passWordErr && !cfPassErr){
            signUpAjax({
                username : userName,
                passw : passWord
            });
        }

    }
    componentWillUnmount(){
        this.props.clearState();
    }


    render(){

        let {userNameChange,passWordChange,cfPassChange,onSubmit} = this;

        let {userName,passWord,cfPass,userNameErr,passWordErr,cfPassErr} = this.state;

        let {signUpMsg} = this.props;

        let retInfo = null;

        if(signUpMsg){
            if(signUpMsg.code === 0){
                retInfo = (
                    <div className="ui message positive">
                        <p>{signUpMsg.msg}</p>
                        <p>马上帮您登录</p>
                    </div>
                );
            }else{
                retInfo = (
                    <div className="ui message error">
                        <p>{signUpMsg.msg}</p>
                    </div>
                )
            }
        }

        let userNameMsg = userNameErr?(<p className={S.err}>{userNameErr}</p>) : null;

        let passWordMsg = passWordErr?(<p className={S.err}>{passWordErr}</p>):null;

        let cfPassMsg = cfPassErr?(<p className={S.err}>{cfPassErr}</p>):null;

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
                    <div className={`field ${passWordErr? 'error':''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            ref="passwDom"
                            value = {passWord}
                            onChange = {passWordChange}
                        />
                        {passWordMsg}
                    </div>
                    <div className={`field ${cfPassMsg? 'error':''}`}>
                        <input
                            type="text"
                            placeholder="确认密码"
                            ref="cfPassDom"
                            value={cfPass}
                            onChange={cfPassChange}

                        />
                        {cfPassMsg}
                    </div>
                    <div className="field">
                        <button type="submit"
                                className="ui button fluid primary"
                                onClick={onSubmit}
                        >注册</button>
                    </div>
                </form>
            </div>
        );
    }
}
