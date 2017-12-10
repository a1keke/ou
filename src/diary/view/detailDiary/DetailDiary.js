
import React,{Component} from 'react';

import DiarySingle  from './../../components/diarySingle/DiarySingle.js';

export default class DetailDiary extends Component{
    constructor(props){
        super(props);
    }


    render(){

        let {title} = this.props.match.params;

        return (
            <DiarySingle {...{title}}/>
        );
    }
}

