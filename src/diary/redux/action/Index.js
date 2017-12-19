//action
//发送fetch的action
const FETCH_SUCCESS = res =>{
    return {
        type:'FETCH_SUCCESS',
        res
    }
};
const FETCH_FAIL = (res) =>{
    return {
        type:'FETCH_FAIL',
        res
    }
};
const FETCH_ERROR = e =>{
 return {
        type:'FETCHFAI_ERROR',
        e
    }
};
//发送基本信息的action
export const fetchBaseInfo = postData=>{
    return dispatch =>{
        return fetch('/base',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(postData)
        }).then(res=>res.json()).then(res=>{
            return dispatch(FETCH_SUCCESS({isbase:true}));
        }).catch(e=>{
            return dispatch(FETCH_ERROR(e))
        })
    }
}
// 获取单篇详细diary的action
export const fetchDetailDiary = diaryTitle=>{
    return dispatch =>{
        return fetch('/diary/getDiary',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({title:diaryTitle})
        }).then(res=>res.json()).then(res=>{
            if(res.code){
                return dispatch(FETCH_SUCCESS({diary:res.diary}));
            }else{
                return dispatch(FETCH_FAIL({status:0}));
            }
        }).catch(e=>{
            return dispatch(FETCH_ERROR(e));
        })
    }
}
// 获取diary列表的action
export const fetchDiaryList = ()=>{
    return dispatch =>{
        return fetch('/diary/getAllDiary')
            .then(res=>res.json())
            .then(res=>{
            return dispatch(FETCH_SUCCESS({diaryList:res.diaryList}));
        }).catch(e=>{
            return dispatch(FETCH_ERROR(e));
        })
    }
}
// 更改弹框状态的action
export const showToast = (text,btnEvent)=>{
    return {
        type:'SHOW_TOAST',
        text,
        btnEvent
    }
}
export const hideToast = {
        type:'HIDE_TOAST',
}