import React,{Component} from 'react';
import HeroDetail from './../../components/heroDetail/HeroDetail.js';
export default class Index extends Component{
    constructor(props){
        super(props);
    }
    render(){

        return (
            <HeroDetail name={this.props.match.params.name}></HeroDetail>
        );
    }
}
