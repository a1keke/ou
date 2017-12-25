import * as action from '../action/index.js';

import objectAssign from 'object-assign';

//fetch状态
const fetchState = {
    isbase:false,//是否已经发送基本信息
    diary :null,//单篇日记
    status:1,//页面状态1正常，0异常
    diaryList:[],//所有日记,
    isLogin:localStorage.getItem('isLogin')?localStorage.getItem('isLogin'):false
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
            return objectAssign({},state,{e:action.e})
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