import React,{Component} from 'react';
import S from './index.scss';
export default class AddQuestion extends Component{
    constructor(props){
        super(props);
        this.state = {
            question:'',
            answer:'',
            fetchResult:''
        }
        this.questionChange = this.questionChange.bind(this);
        this.answerChange = this.answerChange.bind(this);
        this.fetchAddQuestion = this.fetchAddQuestion.bind(this);
    }
    questionChange(ev){
        this.setState({question:ev.target.value});
    }
    answerChange(ev){
        this.setState({answer:ev.target.value});
    }
    fetchAddQuestion(){
        let {question,answer} = this.state;
        if(!question || !answer){
            this.setState({fetchResult:'不能有空白项'});
            return false;
        }
        fetch('/kele/addQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body:JSON.stringify({ques:question,answ:answer})
        }).then(res=>res.json()).then(res=>{
            this.setState(
                res.code==1?
                {fetchResult:'提交成功，请刷新本页面',question:'',answer:''}
                :{fetchResult:res.err}
            )
        })
    }
    render(){
        let {questionChange,answerChange,fetchAddQuestion} = this;
        let {question,answer,fetchResult} = this.state;
        return (
            <div>
                <div className={`ui labeled input ${S.input}`}>
                    <a className="ui label">
                        问题
                    </a>
                    <input
                        type="text"
                        value={question}
                        onChange={questionChange}
                    />
                </div>
                <div className={`ui labeled input ${S.input}`}>
                    <a className="ui label">
                        答案
                    </a>
                    <input
                        type="text"
                        value={answer}
                        onChange={answerChange}
                    />
                </div>
                <div className="ui divider"></div>
                <div className="ui blue labeled submit icon button" onClick={fetchAddQuestion}>
                    <i className="icon bar"></i>提交
                </div>
                {fetchResult?(<p className={S.error}>{fetchResult}</p>):(null)}
            </div>
        );
    }
}
