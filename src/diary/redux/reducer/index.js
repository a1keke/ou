import * as action from '../action/index.js';

import objectAssign from 'object-assign';

//fetch状态
const fetchState = {
    isbase:false,//是否已经发送基本信息
    diary :null,//单篇日记
    status:1,//页面状态1正常，0异常
    diaryList:[],//所有日记,
    page : 0,
    nextPage : 1,
    nickname:localStorage.getItem('nickname')?localStorage.getItem('nickname'):'',
    account:localStorage.getItem('account')?localStorage.getItem('account'):'',
}
//fetch的reducer模板
//target 名称
// defaultState 初始state
// successState fetch成功后要改变的值
export const fetchReducer = (state=fetchState,action)=>{
    switch (action.type){
        case 'FETCH_SUCCESS':
            return objectAssign({},state,action.res);
        case 'FETCH_FAIL':
            return objectAssign({},state,action.res);
        case 'FETCH_ERROR':
            return objectAssign({},state,{e:action.e});
        case 'DELETE_ONE_DIARY':
            let diaryList = state.diaryList.filter(ele=>ele.index!==action.res.index)
            return objectAssign({},state,{diaryList});

        default:
            return state
    }
}
const msgState = {
    page : 0,
    nextPage : 1,
    msgList:[]
}
export const msgReducer = (state=msgState,action)=>{
    switch (action.type){
        case 'FETCH_MSGLIST_SUCCESS':
            return objectAssign({},state,action.res);
        case 'FETCH_MSGLIST_FAIL':
            return objectAssign({},state,action.res);
        default:
            return state
    }
}
// 要被共享的组件的状态
const toastState = {
    text:'',//弹框的文字
    isHidden:true,//是否隐藏
    btnEvent:null,//按钮的事件
}
export const toastReducer = (state=toastState,action)=>{
    switch (action.type){
        case 'SHOW_TOAST':
            return objectAssign({},state,{text:action.text,isHidden:false,btnEvent:action.btnEvent});
        case 'HIDE_TOAST':
            return objectAssign({},state,{isHidden:true});
        default:
            return state
    }
}