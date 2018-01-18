//action
//发送fetch的action
let  clientCrypto = require('../../../../util/_crypto.client.js');
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
const DELETE_ONE_DIARY = res =>{
    return {
        type:'DELETE_ONE_DIARY',
        res
    }
};
//发送基本信息的action
export const fetchBaseInfo = postData=>{
    return dispatch =>{
         fetch('/diary/base',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body:JSON.stringify(postData)
        }).then(res=>res.json()).then(res=>{
            let nickname = localStorage.getItem('nickname');
            let account = localStorage.getItem('account');
            if(nickname && account && (nickname!=res.nickname || account!=res.account)){
                dispatch(showToast('登录状态异常，请重新登录'));
                dispatch(fetchLogout());
                dispatch(FETCH_SUCCESS({isbase:true}))
                return false;
            }
            dispatch(FETCH_SUCCESS({
                isbase:true,
                nickname:res.nickname,
                account:res.account
            }));
        }).catch(e=>{
            return dispatch(FETCH_ERROR(e))
        })
    }
}
// 获取单篇详细diary的action
export const fetchDetailDiary = diaryTitle=>{
    return dispatch =>{
         fetch('/diary/getDiary',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body:JSON.stringify({title:diaryTitle})
        }).then(res=>res.json()).then(res=>{
            if(res.code){
                dispatch(FETCH_SUCCESS({diary:res.diary}));
            }else{
                dispatch(FETCH_FAIL({status:0}));
            }
        }).catch(e=>{
            return dispatch(FETCH_ERROR(e));
        })
    }
}
// 获取diary列表的action
export const fetchDiaryList = (nextPage,diaryList,cb)=>{
    return dispatch =>{
         fetch('/diary/getAllDiary',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body:JSON.stringify({nextPage})
        })
            .then(res => res.json())
            .then(res => {
                if(cb){cb();}
                dispatch(FETCH_SUCCESS({diaryList:diaryList.concat(res.diaryList),page:res.page,nextPage:res.nextPage}))
            })
            .catch(e => dispatch(FETCH_ERROR(e)))
    }
}

// 注册的action
export const fetchSignUp = info=>{
    return dispatch =>{
         fetch('/diary/signUp',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body:JSON.stringify({info:clientCrypto.pubEncrypt(JSON.stringify(info))})
        }).then(res => res.json())
            .then(res => {
                if(!res.code){
                    dispatch(showToast(res.err));
                }else {
                    localStorage.setItem('nickname',info.nickname);
                    localStorage.setItem('account',info.account);
                    dispatch(showToast('注册成功，已经为你自动登录'));
                    dispatch(FETCH_SUCCESS({
                        nickname:info.nickname,
                        account:info.account,
                        diaryList:[],
                        page : 0,
                        nextPage : 1
                    }))
                }
            })
            .catch(e => dispatch(FETCH_ERROR(e)))
    }
}
// 登录的action
export const fetchLogin = (info)=>{
    return dispatch=>{
         fetch('/diary/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body:JSON.stringify({info:clientCrypto.pubEncrypt(JSON.stringify(info))})
        }).then(res=>res.json()).then(res=>{
            if(!res.code){
                dispatch(showToast(res.err))
            }else {
                localStorage.setItem('nickname',res.nickname);
                localStorage.setItem('account',res.account);
                dispatch(showToast('登录成功'));
                dispatch(FETCH_SUCCESS({
                    nickname:res.nickname,
                    account:res.account,
                    diaryList:[],
                    page : 0,
                    nextPage : 1
                }))
            }
        })
    }
}
//退出登录的action
export const fetchLogout = ()=>{
    return dispatch=>{
         fetch('/diary/logout',{
            method:'POST',
            credentials: 'same-origin',
        }).then(res=>res.json()).then(res=>{
            localStorage.clear();
            dispatch(FETCH_SUCCESS({
                nickname:'',
                account:'',
                diaryList:res.diaryList,
                page : res.page,
                nextPage : res.nextPage
            }))
        })
    }
}
//删除日记的action
export const fetchDeleteDiary = info=>{
    return dispatch=>{
         fetch('/diary/deleteDiary',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body:JSON.stringify(info)
        }).then(res=>res.json()).then(res=>{
            res.code?
                dispatch(showToast('删除成功！'))&&dispatch(DELETE_ONE_DIARY({index:info.index}))
                :dispatch(showToast(`删除失败! ${res.err}`));
        })
    }
}

const FETCH_MSGLIST_SUCCESS = res=>{
    return {
        type:'FETCH_MSGLIST_SUCCESS',
        res
    }
}
const FETCH_MSGLIST_FAIL = res=>{
    return {
        type:'FETCH_MSGLIST_FAIL',
        res
    }
}
//获取留言的action
export const fetchMsgList = (nextPage,msgList,cb)=>{
    return dispatch =>{
         if(cb){cb();}
         fetch('/diary/getAllMsg',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body:JSON.stringify({nextPage})
        })
            .then(res => res.json())
            .then(res => {
                if(cb){cb();}
                dispatch(FETCH_MSGLIST_SUCCESS({msgList:msgList.concat(res.msgList),page:res.page,nextPage:res.nextPage}))
            })
            .catch(e => dispatch(FETCH_MSGLIST_FAIL(e)))
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