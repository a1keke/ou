import * as action from '../action/Index.js';

const defaultState = {
    isFetching:false,
    isbase:false,
    diary :null,
    status:1,
    diaryList:[]
}
//fetch的reducer模板
//target 名称
// defaultState 初始state
// successState fetch成功后要改变的值
const fetchReducer = (state=defaultState,action)=>{
    switch (action.type){
        case 'FETCH_REQUEST':
            return Object.assign({},state,{isFetching:true});
        case 'FETCH_SUCCESS':
            return Object.assign({},state,{isFetching:false});
        case 'FETCH_FAIL':
            return Object.assign({},state,{isFetching:false});
        case 'FETCH_ERROR':
            return Object.assign({},state,{e:action.e})
        default:
            return state
    }
}

//reducer
// export const root = (state=rootDefaultState,action)=> {
//     switch (action.type){
//         case 'FETCH_BASEINFO_REQUEST':
//             return Object.assign({},state,{isFetching:true});
//         case 'FETCH_BASEINFO_SUCCESS':
//             return Object.assign({},state,{isFetching:false,isbase:true});
//         case 'FETCH_BASEINFO_ERROR':
//             return Object.assign({},state,{e:action.e})
//         default:
//             return state
//     }
// }
// export const detailDiary = (state=detailDiaryDefaultState,action)=> {
//     switch (action.type){
//         case 'FETCH_DETAILDIARY_REQUEST':
//             return Object.assign({},state,{isFetching:true});
//         case 'FETCH_DETAILDIARY_SUCCESS':
//             if(action.res.code){
//                 return Object.assign({},state,{isFetching:false,diary:action.res.diary})
//             }else {
//                 return Object.assign({},state,{isFetching:false,status:0})
//             }
//         case 'FETCH_DETAILDIARY_ERROR':
//             return Object.assign({},state,{e:action.e})
//         default:
//             return state
//     }
// }
// export const diaryList = (state=diartListDefaultState,action)=> {
//     switch (action.type){
//         case 'FETCH_DIARYLIST_REQUEST':
//             return Object.assign({},state,{isFetching:true});
//         case 'FETCH_DIARYLIST_SUCCESS':
//             return Object.assign({},state,{isFetching:false,diaryList:action.res.diaryList})
//         case 'FETCH_DIARYLIST_ERROR':
//             return Object.assign({},state,{e:action.e})
//         default:
//             return state
//     }
// }
