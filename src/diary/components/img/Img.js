import React,{Component} from 'react';
import S from './style.scss';
export default class Img extends Component{
    constructor(props){
        super(props);
        this.state = {
            isBig : false
        }
        this.clickHandle = this.clickHandle.bind(this);
    }
    clickHandle(){
        this.setState({isBig:!this.state.isBig});
    }
    render(){
        let {url} = this.props,
            {isBig} = this.state,
            {clickHandle} = this;
        return (
                <div style={{overflow:'auto'}}>
                    <img
                        className={isBig?S.big:''}
                        src={url}
                        onClick={clickHandle}
                    />
                </div>
        );
    }
}
