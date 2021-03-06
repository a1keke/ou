import React,{Component} from 'react';
import S from './style.scss';
import {connect} from 'react-redux';
import throttle from './../../../../util/throttled.js';
import {fetchDiaryList} from '../../redux/action/index.js';
class scrollLoading extends Component{
    constructor(props){
        super(props);
        this.scrollEvent = this.scrollEvent.bind(this);
        this.fetchFlag = false;
    }
    componentDidMount(){

        let {scrollEvent} = this;
        //挂载这个组件时，如果已经之前已经加载完或者根本没有diary，则没有滚动
        if(this.props.nextPage!==0 && this.props.nextPage!==-1){
            window.onscroll = throttle(scrollEvent,200);
        }

    }

    scrollEvent(){
        if(!this.fetchFlag && this.isVisible()){
            let {nextPage,fetchDiaryList,diaryList} = this.props;
            this.fetchFlag = true;
            fetchDiaryList(nextPage,diaryList,()=>{
                this.fetchFlag = false;
            })
        }
    }

    componentWillUnmount(){
        window.onscroll = null;
    }
    isVisible(){
        let scrollTop = window.pageYOffset
            || document.documentElement.scrollTop
            || document.body.scrollTop
            || 0;
        //屏幕高度+卷去高度>全文高度-盒子高度 => 盒子在可视区内
        return document.body.clientHeight+scrollTop >document.body.scrollHeight-this.refs.loading.offsetHeight-100
    }

    render(){
        let {nextPage} = this.props;
        if(!nextPage){
            window.onscroll = null;
        }
        return (
            <div>
                {this.props.children}
                <div className={`${S.bdn} ui segment`} ref="loading">
                    <div className="ui active inverted dimmer">
                        <div className={`ui text ${nextPage?'loader':S.blue}`}>{nextPage?'':'到底啦!'}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const ScrollLoading = connect(state=>{
    return{
        nextPage:state.fetchReducer.nextPage,
        diaryList:state.fetchReducer.diaryList
    }
},dispatch=>{
    return {
        fetchDiaryList:(nextPage,diaryList,cb)=>dispatch(fetchDiaryList(nextPage,diaryList,cb))
    }
})(scrollLoading);

export default ScrollLoading;