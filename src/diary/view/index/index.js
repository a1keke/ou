

import React,{Component} from 'react';

import ReactDOM from 'react-dom';


import DiaryTextarea from '../../components/diaryTextarea/DiaryTextarea.js';

import DiaryList from '../../components/diaryList/DiaryList.js';
import {connect} from 'react-redux';
import {fetchDiaryList} from './../../redux/action/Index.js';

class index extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.fetchDiaryList();
    }
    render(){
        let {diaryList} = this.props;
        return (
          <div>
              <DiaryTextarea/>
              <DiaryList {...{diaryList}}/>
          </div>
        );
    }
}
const Index = connect(state=>{
    return {diaryList:state.fetchReducer.diaryList}
},dispatch=>{
    return {
        fetchDiaryList:()=>dispatch(fetchDiaryList())
    }
})(index);
export default Index;