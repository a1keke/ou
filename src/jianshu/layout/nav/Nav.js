
import {Component} from 'react';

import {Link,NavLink} from 'react-router-dom';

import S from './style.scss';

export  default class Nav extends Component{
    constructor(props){
        super(props);
    }
    render(){

        let {userInfo,logOut,history,initMyPage} = this.props;

        let userNav = null;

        if(userInfo){
            let {user_name,avatar,user_intro,user_id} = userInfo;
            userNav = (
                <NavLink
                    to="/jianshu/my_page"
                    className={`${S.avatar} item`}
                    activeClassName="active"
                    onClick={(ev)=>{
                        ev.stopPropagation();
                        ev.preventDefault();
                        history.push("/jianshu/my_page",{
                            user_name,
                            avatar,
                            user_intro,
                            user_id
                        });
                        initMyPage({user_id},{user_id},'所有文章');

                    }}

                >
                    <img
                        src={userInfo.avatar}
                        className="ui image avatar"
                         alt=""
                    />
                    <div className={S.dropDown}>
                        <p onClick={(ev)=>{
                            ev.stopPropagation();
                            ev.preventDefault();
                            logOut();
                        }}>注销</p>
                    </div>
                </NavLink>
            );
        }else{
            userNav = [
                (
                    <NavLink
                        to="/jianshu/sign_in"
                        className={`item`}
                        activeClassName="active"
                        key={1}
                    >
                        登录
                    </NavLink>
                ),
                (
                    <NavLink
                        to="/jianshu/sign_up"
                        className={`item`}
                        activeClassName="active"
                        key={2}
                    >
                        注册
                    </NavLink>
                )
            ]
        }

        return(
            <div className={`ui fixed secondary pointing menu ${S.nav}`}>
                <div className="ui container">
                    <Link to="/jianshu" className={`header item`}>
                        Nodes
                    </Link>
                    <NavLink exact to="/jianshu" className={`item`} activeClassName="active">
                        首页
                    </NavLink>
                    <div className="menu right">
                        {userNav}
                        <NavLink to="/jianshu/write" className={`item`} activeClassName="active">
                            写文章
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}