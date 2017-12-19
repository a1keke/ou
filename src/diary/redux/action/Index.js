//action
//发送baseInfo的action
const FETCH_REQUEST = () => {
    return  {
        type:'FETCH_REQUEST'
    }
};
const FETCH_SUCCESS = res =>{
    return {
        type:'FETCH_SUCCESS',
        res
    }
};
const FETCH_FAIL = () =>{
    return {
        type:'FETCH_FAIL',
    }
};
const FETCH_ERROR = e =>{
 return {
        type:'FETCHFAI_ERROR',
        e
    }
};
export const fetchBaseInfo = postData=>{
    return dispatch =>{
        dispatch(FETCH_REQUEST());
        return fetch('/base',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(postData)
        }).then(res=>res.json()).then(res=>{
            return dispatch(FETCH_SUCCESS(res));
        }).catch(e=>{
            return dispatch(FETCH_ERROR(e))
        })
    }
}
// 获取单篇详细diary的action

export const fetchDetailDiary = diaryTitle=>{
    return dispatch =>{
        dispatch(FETCH_REQUEST());
        return fetch('/diary/getDiary',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({title:diaryTitle})
        }).then(res=>res.json()).then(res=>{
            if(res.code){
                return
                dispatch(FETCH_SUCCESS(res.diary));
            }else{
                return dispatch(FETCH_FAIL());
            }
        }).catch(e=>{
            return dispatch(FETCH_ERROR(e));
        })
    }
}

// 获取diary列表的action
export const fetchDiaryList = ()=>{
    return dispatch =>{
        dispatch(FETCH_REQUEST());
        return fetch('/diary/getAllDiary')
            .then(res=>res.json())
            .then(res=>{
            return dispatch(FETCH_SUCCESS(res.diaryList));
        }).catch(e=>{
            return dispatch(FETCH_ERROR(e));
        })
    }
}