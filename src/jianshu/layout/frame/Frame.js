
import {Component} from 'react';

import {Route,Redirect} from 'react-router-dom';

import S from './style.scss';

import Nav from '../nav/Nav';

import Home from '../../view/home/Home';

import SignIn from '../../view/user/SignIn';

import SignUp from '../../view/user/SignUp';

import config from '../../common/config/config';

import MyPage from "../../view/user/MyPage";

export default class Layout extends Component{
    constructor(props){
        super(props);
        this.signInAjax = this.signInAjax.bind(this);
        this.signUpAjax = this.signUpAjax.bind(this);
        this.clearState = this.clearState.bind(this);
        this.initData = this.initData.bind(this);
        this.logOut = this.logOut.bind(this);
        this.getPreview = this.getPreview.bind(this);
        this.initMyPage = this.initMyPage.bind(this);
        this.state = {
            userInfo : null,
            signInMsg : null,
            signUpMsg : null,
            hasAjaxAuto : false,
            myPagePreview : [],
            noteBooks : [],
            previewName : '所有文章'
        }
    }

    signInAjax(reqData){
        $.post(`${config.url}/login`,reqData).done((ret)=>{
            if(ret.code === 0 ){

                this.initData(ret.data);

            }else{

                this.setState({signInMsg:ret});

            }
        })
    }

    signUpAjax(reqData){
        $.post(`${config.url}/register`,reqData).done((ret)=>{

            this.setState({signUpMsg : ret})

            if(ret.code === 0 ){
                this.initData(ret.data);
            }
        })
    }

    clearState(){
        this.setState({
            signInMsg : null,
            signUpMsg : null
        })
    }

    initData(userInfo){

        let {id,avatar,username,user_intro} = userInfo;

        if(userInfo){
            avatar = config.url + userInfo.avatar;
        }

        this.setState({userInfo:{
            user_id : id,
            avatar,
            user_name : username,
            user_intro
        }});

    }

    logOut(){

        let {history} = this.props;

        $.post(`${config.url}/logout`).done((reqData)=>{
            if(reqData.code === 0){
                this.setState({userInfo:null})
                history.push("/jianshu",{});
            }
        })

    }

    getPreview(reqData,previewName){
        $.post(`${config.url}/getPreview`,reqData).done(({code,data})=>{
            if(code === 0){
                this.setState({myPagePreview:data,previewName})
            }
        })
    }

    initMyPage(user_id,previewReqData,previewName){

        this.getPreview(previewReqData,previewName);

        $.post(`${config.url}/getCollection`,user_id).done(({code,data})=>{
            if(code === 0){
                this.setState({noteBooks:data})
            }
        })
    }

    componentDidMount(){
        $.post(`${config.url}/autologin`).done((reqData)=>{
            if(reqData.code === 0){
                this.initData(reqData.data);
            }
            this.setState({hasAjaxAuto:true})
        })

        let {state,pathname} = this.props.location;

        if(state && pathname === '/my_page'){

            let {user_id} = state;

            this.initMyPage({user_id},{user_id},'所有文集');

        }
    }

    render(){
        let {signInAjax,signUpAjax,clearState,logOut,initMyPage,getPreview} = this;

        let {history} = this.props;

        let {userInfo,signInMsg,signUpMsg,hasAjaxAuto,myPagePreview,noteBooks,previewName} = this.state;

        if(!hasAjaxAuto){
            return (<div></div>);
        }

        return (
            <div className={S.layout}>
                <Nav {...{userInfo,logOut,history,initMyPage}}/>
                <Route
                    path="/jianshu"
                    exact render={(props)=>{
                        return (
                            <Home
                                {...{initMyPage}}
                                {...props}
                            />
                        )
                }}　/>
                <Route
                    path="/jianshu/sign_in"
                    exact render={(props)=>{
                        return (
                            userInfo ? (
                                <Redirect to="/"/>
                            ):(
                                <SignIn {...{
                                    signInAjax,
                                    signInMsg,
                                    clearState
                                }} />
                            )
                        );
                }}　/>
                <Route
                    path="/jianshu/sign_up"
                    exact render={(props)=>{
                        return(
                            userInfo ? (
                                <Redirect to="/"/>
                            ):(
                                <SignUp {...{
                                    signUpAjax,
                                    signUpMsg,
                                    clearState
                                }} />
                            )
                        )
                }}　/>
                <Route
                    path="/jianshu/my_page"
                    exact render={(props)=>{
                    return(
                        props.location.state ? (
                            <MyPage {...{
                                myPagePreview,
                                noteBooks,
                                previewName,
                                initMyPage,
                                getPreview
                            }}
                                    {...props}
                            />
                        ):(
                            <Redirect to="/jianshu"/>
                        )
                    )
                }}　/>
            </div>
        );
    }
}
