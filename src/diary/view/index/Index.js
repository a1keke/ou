import React,{Component} from 'react';
import DiaryTextarea from '../../components/diaryTextarea/DiaryTextarea.js';
import DiaryList from '../../components/diaryList/DiaryList.js';
import LoadingMore from '../../components/loadingMore/LoadingMore.js';
import {connect} from 'react-redux';
import {fetchDiaryList} from '../../redux/action/index.js';

class index extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let {diaryList,nextPage,fetchDiaryList} = this.props;
        if(!this.props.diaryList.length){
            fetchDiaryList(nextPage,diaryList);
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        return JSON.stringify(nextProps.diaryList)!==JSON.stringify(this.props.diaryList)||JSON.stringify(nextProps.nextPage)!==JSON.stringify(this.props.nextPage)
    }
    render(){
        let {diaryList,account,nextPage} = this.props;

        return (
          <div>
              {account?<DiaryTextarea/>:null}
              {nextPage===-1?
                  <DiaryList {...{diaryList}}/>
                  :<LoadingMore>
                      <DiaryList {...{diaryList}}/>
                  </LoadingMore>
              }
          </div>
        );
    }
}
const Index = connect(state=>{
    return {
        diaryList:state.fetchReducer.diaryList,
        account:state.fetchReducer.account,
        nextPage:state.fetchReducer.nextPage
    }
},dispatch=>{
    return {
        fetchDiaryList:(nextPage,diaryList,cb)=>dispatch(fetchDiaryList(nextPage,diaryList,cb))
    }
})(index);
export default Index;