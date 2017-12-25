import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Validation from '../../../../util/validation.js';
import S from './style.scss';
export default class Login extends Component{
    constructor(props){
        super(props);
    }
    render(){
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
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon blue"></i>
                                    <input type="text" name="account" placeholder="account" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon blue"></i>
                                    <input type="password" name="password" placeholder="password" />
                                </div>
                            </div>
                            <div className="ui fluid large blue submit button">Login</div>
                        </div>

                        <div className="ui error message"></div>

                    </form>

                    <div className="ui message">
                        New to us? <Link to="/diary/user/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        );
    }
}