import React,{Component} from 'react';
import S from './style.scss';
export default class ClickLoading extends Component{
    constructor(props){
        super(props);
        this.state = {
            isFetch : false
        }
        this.changeFetch = this.changeFetch.bind(this);
        this.clickHandle = this.clickHandle.bind(this);
    }
    changeFetch(){
        this.setState({isFetch:!this.state.isFetch});
    }
    clickHandle(){
        let {clickEvent,nextPage} = this.props;
        if(nextPage>0)
            clickEvent(this.changeFetch)
    }
    render(){
        let {nextPage} = this.props;
        return (
            <div className={`${S.bdn} ui segment`} >
                <div className="ui active inverted dimmer">
                    {
                        this.state.isFetch?
                            (<div className='ui text loader'></div>)
                            :<div className={`ui text ${S.blue}`} onClick={this.clickHandle} >{nextPage?'点击加载更多':'到底啦!'}</div>
                    }
                </div>
            </div>
        );
    }
}
