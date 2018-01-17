import React,{Component} from 'react';
import S from './style.scss';
import MsgTextarea from './../../components/msgTextarea/MsgTextarea.js';
import ConnectList from './../../components/connectList/ConnectList.js';
export default class ConnectPage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <section className={`ui grid stackable vertically ${S.connectPage}`}>
                <ConnectList></ConnectList>
            </section>
        );
    }
}
