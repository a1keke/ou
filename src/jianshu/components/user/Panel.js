
import {Component} from 'react';

import {NavLink} from 'react-router-dom';

import S from './style.scss';

export default class Panel extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {children} = this.props;

        return (
            <div className="ui stackable grid container center aligned">
                <div className={`six wide column ${S.main}`}>
                    <h4 className={S.title}>
                        <div className={S['normal-title']}>
                            <NavLink to="/jianshu/sign_in"
                                     activeClassName={S.active}
                            >登录</NavLink>
                            <b>·</b>
                            <NavLink to="/jianshu/sign_up"
                                     activeClassName={S.active}
                            >注册</NavLink>
                        </div>
                    </h4>
                    {children}
                </div>
            </div>
        );
    }
}