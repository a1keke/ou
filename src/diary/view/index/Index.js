import React,{Component} from 'react';
import DiaryTextarea from '../../components/diaryTextarea/DiaryTextarea.js';
import DiaryList from '../../components/diaryList/DiaryList.js';
import {connect} from 'react-redux';
import {fetchDiaryList} from '../../redux/action/index.js';

class index extends Component{
    constructor(props){
        super(props);

    }
    componentDidMount(){
        this.props.diaryList.length?'':this.props.fetchDiaryList();
    }
    shouldComponentUpdate(nextProps,nextState){
        return !(JSON.stringify(nextProps.diaryList)===JSON.stringify(this.props.diaryList))

    }
    render(){
        let {diaryList,account} = this.props;
        return (
          <div>
              {account?<DiaryTextarea/>:null}
              <DiaryList {...{diaryList}}/>
          </div>
        );
    }
}
const Index = connect(state=>{
    return {
        diaryList:state.fetchReducer.diaryList,
        account:state.fetchReducer.account
    }
},dispatch=>{
    return {
        fetchDiaryList:()=>dispatch(fetchDiaryList())
    }
})(index);
export default Index;