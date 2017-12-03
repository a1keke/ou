import React,{Component} from 'react';

import S from './style.scss';

export default class Toast extends Component{
    constructor(props){
        super(props);
    }
    render(){

        let {text,flag,changeToast,btnEvent} = this.props;
        
        return (
            <div
                className={flag?
                    'ui dimmer modals page transition visible active':
                    'ui dimmer modals page transition'}
                onClick={()=>{
                    changeToast();
                }}
                >
                <div className={`ui small test modal transition visible active ${S.fix}`}>
                    <div className={`header ${S.bbn}`}>Warning</div>
                    <div className="content">
                        <p className={S.tac}>{text}</p>
                    </div>
                    <div className={`actions`}>
                        <div className="ui positive right labeled icon button" onClick={btnEvent}>
                            yes
                            <i className="checkmark icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
