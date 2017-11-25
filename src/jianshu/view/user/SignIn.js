
import {Component} from 'react';

import Panel from '../../components/user/Panel';

import SignInPanel from '../../components/user/SignInPanel';

export default class SignIn extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {signInAjax,signInMsg,clearState} = this.props;
        return (
            <Panel>
                <SignInPanel {...{
                    signInAjax,
                    signInMsg,
                    clearState
                }}/>
            </Panel>
        );
    }
}