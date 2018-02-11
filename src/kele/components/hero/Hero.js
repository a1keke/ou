import React,{Component} from 'react';
import {Link} from 'react-router-dom';
export default class Hero extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {name,imgSrc,url} = this.props;
        return (
            <div className="card">
                <Link className="image" to={`./kele/${url}`}>
                    <img src={imgSrc} />
                </Link>
                <div className="content">
                    <Link className="header" to={`./kele/${url}`}>{name}</Link>
                </div>
            </div>
        );
    }
}