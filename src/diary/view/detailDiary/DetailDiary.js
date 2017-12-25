
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchDetailDiary} from '../../redux/action/index.js';
import DiarySingle  from './../../components/diarySingle/DiarySingle.js';

class detailDiary extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        let {title} = this.props.match.params;
        this.props.fetchDetailDiary(title);
    }

    shouldComponentUpdate(nextProps,nextState){
        return !(JSON.stringify(nextProps.diary)===JSON.stringify(this.props.diary)&&JSON.stringify(nextProps.status)===JSON.stringify(this.props.status));
    }

    render(){

        let {diary,status} = this.props;
        return (
            <DiarySingle {...{diary,status}}/>
        );
    }
}
const DetailDiary = connect(state=>{
    let {diary,status} = state.fetchReducer
    return {diary,status}
},dispatch=>{
    return {
        fetchDetailDiary:diaryTtile=>dispatch(fetchDetailDiary(diaryTtile))
    }
})(detailDiary)
export default DetailDiary;

