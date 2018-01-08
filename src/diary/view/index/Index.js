import React,{Component} from 'react';
import DiaryTextarea from '../../components/diaryTextarea/DiaryTextarea.js';
import DiaryList from '../../components/diaryList/DiaryList.js';
import {connect} from 'react-redux';
import {fetchDiaryList,fetchDeleteDiary} from '../../redux/action/index.js';
import iScroll from 'iscroll/build/iscroll-probe.js';

class index extends Component{
    constructor(props){
        super(props);
        this.scrollEvent = this.scrollEvent.bind(this);
        this.scrollEndEvent = this.scrollEndEvent.bind(this);
        this.scrollBox = null;
    }
    componentDidMount(){
        if(!this.props.diaryList.length){
            this.props.fetchDiaryList()
        }
        window.onscroll = ()=>{
            console.log(1);
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        return JSON.stringify(nextProps.diaryList)!==JSON.stringify(this.props.diaryList)
    }
    scrollEvent(){
        console.log(1);
        return true;
    }
    scrollEndEvent(){
        console.log(2);
        return true;
    }
    render(){
        let {diaryList,account} = this.props;
        return (
          <div id="diaryList" style={{height: window.innerHeight,position:'relative'}}>
              <div style={{position:'absolute',width:'100%'}}>
                  {account?<DiaryTextarea/>:null}
                  <DiaryList {...{diaryList}}/>
              </div>
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