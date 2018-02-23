import React,{Component} from 'react';
import S from './style.scss';
import QuestionList from './../questionList/QuestionList.js';
let  validator = require('../../../../util/validator.js').validator;
export default class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchVal:'',
            searchErr:'',
            resultArr:[]
        }
        this.validator = validator;
        this.changeSearch = this.changeSearch.bind(this);
    }
    changeSearch(ev){
        let msg = this.validator.valiOneByValue('search',ev.target.value);
        if(msg){
            this.setState({
                searchVal:ev.target.value,
                searchErr:msg,
                resultArr:[]
            })
        }else{
            let result = this.props.questionList.filter(ele=>{
                return ele.py.indexOf(ev.target.value)!=-1
            })
            this.setState({
                searchVal:ev.target.value,
                resultArr:result
            })
        }
    }
    render(){
        let {changeSearch} = this;
        let {searchVal,searchErr,resultArr} = this.state;
        return (
            <div className="ui search">
                <div className="ui icon input">
                    <input className="prompt"
                           type="text"
                           placeholder=""
                           value={searchVal}
                           onChange={changeSearch}
                    />
                    <i
                        className="search icon"
                    ></i>
                </div>
                {searchErr?(<p className={S.error}>{searchErr}</p>):(null)}
                <QuestionList questionList={resultArr}></QuestionList>
            </div>
        );
    }
}
