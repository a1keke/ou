
import React,{Component} from 'react';

import Toast from './../toast/Toast.js';

import S from './style.scss';
import 'whatwg-fetch';
import 'promise-polyfill';
export default class DiaryTextarea extends Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
            content:'',
            toastFlag:false,
            toastMsg:'1',
            images:[],
            imagesValue:'',
            btnEvent:null
        }
        this.changeTitle = this.changeTitle.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.saveDairy = this.saveDairy.bind(this);
        this.changeToast = this.changeToast.bind(this);
        this.tabEvent = this.tabEvent.bind(this);
        this.fomartContent = this.fomartContent.bind(this);
        this.hasTab = this.hasTab.bind(this);
        this.noTab = this.noTab.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    };

    changeTitle(ev){this.setState({title:ev.target.value})};

    changeContent(ev){this.setState({content:ev.target.value})};
//图片上传
    changeImage(ev){
        let {imagesForm} = this.refs;

        let {images,content} = this.state;

        let form = new FormData(imagesForm);

        fetch('/diary/upImages',{
            method:'POST',
            body:form
        }).then(res=>{
            return res.json();
        }).then(res=>{
            let num = images.length;
            res.images.map((ele,i)=>{
                ele.index = num;
                if(content.lastIndexOf('\n')!==content.length-1) content += '\n';
                content += '图片'+(num+1)+'(此行不可修改！只能通过点击图片删除此行)\n';
                num++;
            })
            images = images.concat(res.images);
            this.setState({content,images})
        })

    };
    // 删除图片
    deleteImage(name,key){
        let url = '/diary/deleteImage'
        fetch('/diary/deleteImage',{
            type:'GET',
            header:{
                'Content-Type': 'application/json'
            },
            body:{name,key}
        }).then(res=>res.json()).then(res=>{
            console.log(res);
        }).catch(res=>{
            console.log(res);
        })
    }
//输入框支持tab键
    tabEvent(ev){
        if(ev.keyCode===9){
            let _content = this.refs.content;
            let position=_content.selectionStart+4;
            _content.value=_content.value.substr(0,_content.selectionStart)+'    '+_content.value.substr(_content.selectionStart);
            _content.selectionStart=position;
            _content.selectionEnd=position;
            _content.focus();
            this.setState({content:_content.value})
            ev.preventDefault();
        }
    }
//提交diary
    saveDairy(){

        let {changeToast,fomartContent} = this;

        let {title,content} = this.state;

        if(title==='' || content ===''){
            changeToast('标题或者内容均不能为空');
            return false;
        }

        content = fomartContent(content);

        let init = {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({title,content})
        }

        fetch('/diary/saveDiary',init).then(res=>{
            return res.json();
        }).then(res=>{
            let {code} = res;
            code === 1? changeToast('保存成功，请刷新本页'):changeToast('保存失败');

        }).catch(res=>{
            changeToast('保存失败');
        })

    }
//对content进行处理
    fomartContent(content){
        let {hasTab,noTab} = this;

        let _content = content.split('\n');

        let reg = new RegExp(' ','g');

        _content = _content.filter((ele)=>{
            return ele.replace(reg,'').length !== 0 ;
        })

        let result = [];

        switch (_content.length){
            case 1:
                if(hasTab(_content[0])) {
                    result.push({attr: 2, part:_content[0].substring(4,_content[0].length)});
                }else {
                    result.push({attr: 1, part:_content[0]});
                }
                break;
            case 2:
                if(hasTab(_content[0]) && hasTab(_content[1])){
                    result.push({attr: 3, part:_content[0].substring(4,_content[0].length)});
                    result.push({attr: 4, part:_content[1].substring(4,_content[1].length)});
                }else if(noTab(_content[0]) && noTab(_content[1])){
                    result.push({attr: 1, part:_content[0]});
                    result.push({attr: 1, part:_content[1]});
                }else if(hasTab(_content[0]) && noTab(_content[1])){
                    result.push({attr: 2, part:_content[0].substring(4,_content[0].length)});
                    result.push({attr: 1, part:_content[1]});
                }else if(noTab(_content[0]) && noTab(_content[1])){
                    result.push({attr: 1, part:_content[0]});
                    result.push({attr: 2, part:_content[1].substring(4,_content[1].length)});
                }
                break;
            default:
                for(let i = 0 ; i < _content.length ; i++){
                    //第一个特殊处理
                    if(i===0){
                        let now = _content[i],next=_content[i+1];
                        if(hasTab(now) && hasTab(next)){
                            result.push({attr:3,part:now.substring(4,now.length)})
                        }else if(hasTab(now) && noTab(next)){
                            result.push({attr:2,part:now.substring(4,now.length)})
                        }else if(noTab(now)){
                            result.push({attr:1,part:now})
                        }
                        continue;
                    }
                    //最后一个特殊处理
                    if(i===_content.length-1){
                        let now = _content[i],prev=_content[i-1];
                        if(hasTab(now) && hasTab(prev)){
                            result.push({attr:4,part:now.substring(4,now.length)})
                        }else if(hasTab(now) && noTab(prev)){
                            result.push({attr:2,part:now.substring(4,now.length)})
                        }else if(noTab(now)){
                            result.push({attr:1,part:now})
                        }
                        continue;
                    }
                    //中间的
                    let prev=_content[i-1],now = _content[i],next=_content[i+1];
                    if(noTab(now)){
                        result.push({attr:1,part:now})
                    }else if(hasTab(prev) && hasTab(now) && hasTab(next)){
                        result.push({attr:5,part:now.substring(4,now.length)})
                    }else if(hasTab(prev) && hasTab(now) && noTab(next)){
                        result.push({attr:4,part:now.substring(4,now.length)})
                    }else if(noTab(prev) && hasTab(now) && hasTab(next)){
                        result.push({attr:3,part:now.substring(4,now.length)})
                    }else if(noTab(prev) && hasTab(now) && noTab(next)){
                        result.push({attr:2,part:now.substring(4,now.length)})
                    }

                }
                break;
        }

        return result;

    }

    hasTab(part){return part.substr(0,4)==='    ';}

    noTab(part){return part.substr(0,4)!=='    ';}

    changeToast(msg,cb){
        let toastMsg = '';
        let btnEvent = null;
        if(msg){
            toastMsg = msg;
        }
        if(cb){
            btnEvent = cb;
        }
        let {toastFlag} = this.state;

        this.setState({toastMsg,toastFlag:!toastFlag,btnEvent});

    }
    render(){

        let {changeTitle,changeContent,saveDairy,changeToast,tabEvent,changeImage,deleteImage} = this;

        let {title,content,imagesValue,toastMsg,toastFlag,images,btnEvent} = this.state;

        let imagesArr = images.length?(
            <div className={`ui tiny images ${S.images}`}>
                {
                    images.map((ele,i)=>{
                        let {url,name,key} = ele;
                        return (
                            <img className="ui image"
                                 src={url}
                                 key={i}
                                 title={`图片${i+1},点击删除`}
                                 onClick={()=>changeToast('是否确定要删除这张图片？',()=>{
                                     deleteImage(name,key)
                                 })}
                            />
                        )
                    })
                }
            </div>
        ):null;

        return (
            <div>
                <form className={`ui reply form ${S.mtm5}`} encType="multipart/form-data" ref="imagesForm">
                    <div className={`ui labeled input ${S.mb}`}>
                        <a className="ui label">title</a>
                        <input value={title} type="text" placeholder="请输入标题"  onChange={changeTitle} />
                    </div>
                    <div className="field">
                        <textarea value={content} onChange={changeContent} onKeyDown={tabEvent} ref="content"></textarea>
                    </div>
                    <div className="ui blue labeled submit icon button"
                         onClick={saveDairy}
                    >
                        <i className="icon edit"></i>
                        save
                    </div>
                    <div className={`${S.fileBox}`}>
                        <input type="file" onChange={changeImage} multiple='true' title="up Images" name="images" value={imagesValue} />
                        <i className='large image icon' title="up Images"></i>
                    </div>
                </form>
                <Toast {...{text:toastMsg,flag:toastFlag,changeToast,btnEvent}}/>
                {imagesArr}
            </div>
        );
    }
}