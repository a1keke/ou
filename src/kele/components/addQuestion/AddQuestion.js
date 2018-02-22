import React,{Component} from 'react';
import S from './index.scss';
export default class AddQuestion extends Component{
    constructor(props){
        super(props);
        this.state = {
            question:'',
            answer:''
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
        fetch('/kele/addQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body:JSON.stringify({ques:question,answ:answer})
        }).then(res=>res.json()).then(res=>{
            console.log(res);
        })
    }
    render(){
        let {questionChange,answerChange,fetchAddQuestion} = this;
        let {question,answer} = this.state;
        return (
            <div>
                <div className={`ui labeled input ${S.input}`}>
                    <a className="ui label">
                        问题
                    </a>
                    <input
                        type="text"
                        placeholder="..."
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
                        placeholder="..."
                        value={answer}
                        onChange={answerChange}
                    />
                </div>
                <div className="ui divider"></div>
                <div className="ui blue labeled submit icon button" onClick={fetchAddQuestion}>
                    <i className="icon bar"></i>提交
                </div>
            </div>
        );
    }
}
