import React,{Component} from 'react';
import S from './style.scss';
export default class QuestionList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {questionList} = this.props;
        return (
            <ul className={`${S.pad} ui list`}>
                {
                    questionList.map((ele,i)=>{
                        return (
                            <li key={i}>{ele.ques}
                                <ul>
                                    <li>{ele.answ}</li>
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}
