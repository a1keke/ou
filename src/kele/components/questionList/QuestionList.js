import React,{Component} from 'react';
export default class QuestionList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {questionList} = this.props;
        return (
            <ul className="ui list">
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
