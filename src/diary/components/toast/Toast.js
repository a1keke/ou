import React,{Component} from 'react';
import {connect} from 'react-redux';
import {hideToast} from '../../redux/action/index.js';
import S from './style.scss';

class toast extends Component{
    constructor(props){
        super(props);
    }
    render(){

        let {text,isHidden,hideToast,btnEvent} = this.props;
        return (
            <div
                className={isHidden?'ui dimmer modals page transition':
                    `ui dimmer modals page transition visible active ${S.zindex}`}
                onClick={hideToast}
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
const Toast = connect(state=>{
    return {
        text:state.toastReducer.text,
        isHidden:state.toastReducer.isHidden,
        btnEvent:state.toastReducer.btnEvent
    }
},dispatch=>{
    return {
        hideToast:()=>dispatch(hideToast)
    }
})(toast);
export default Toast;