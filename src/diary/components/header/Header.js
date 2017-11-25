import React,{Component} from 'react';

import S from './header.scss';

export default class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <h2 className={`ui center aligned icon header ${S.mt}`}>
                <i className={`circular icon ${S.header}`}></i>
                aikeke
            </h2>
        );
    }
}
