import {Component} from 'react';

import Panel from '../../components/user/Panel';

import SignUpPanel from '../../components/user/SignUpPanel';

export default class SignUp extends Component{
    constructor(props){
        super(props);
    }
    render(){

        let {signUpAjax,signUpMsg,clearState} = this.props;

        return (
            <Panel>
                <SignUpPanel {...{
                    signUpAjax,
                    signUpMsg,
                    clearState
                }}/>
            </Panel>
        );
    }
}
