import React,{Component} from 'react';
export default class QuestionList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <ul className="ui list">
                <li>问题
                    <ul>
                        <li>答案</li>
                    </ul>
                </li>
                <li>问题
                    <ul>
                        <li>答案</li>
                    </ul>
                </li>
                <li>问题
                    <ul>
                        <li>答案</li>
                    </ul>
                </li>
            </ul>
        );
    }
}
