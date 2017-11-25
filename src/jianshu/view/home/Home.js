
import {Component} from 'react';

import PreviewList from '../../layout/preview/PreviewList';

import Recommend from '../../components/home/Recommend';

import config from '../../common/config/config';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            previewList : [],
            authors : []
        }
        this.onCollectionClick = this.onCollectionClick.bind(this);
    }

    componentDidMount(){
        $.post(`${config.url}/getPreview`).done((ret)=>{
            if(ret.code === 0){
                this.setState({
                    previewList:ret.data
                })
            }
        })
        $.post(`${config.url}/getAuthor`).done((ret)=>{
            if(ret.code === 0){
                this.setState({
                    authors:ret.data
                })
            }
        })
    }
    onCollectionClick(user_id,collection_id,collection_name){
        let {initMyPage} = this.props;

        initMyPage({user_id},{collection_id},collection_name);

    }

    render(){
        let {onCollectionClick} = this;

        let {initMyPage} = this.props;

        let {previewList,authors} = this.state;

        return (
            <div className="ui container grid">
                <div className="column twelve wide">
                    <PreviewList {...{previewList,onCollectionClick,initMyPage}} />
                </div>
                <div className="column four wide">
                    <Recommend {...{authors,initMyPage}} />
                </div>
            </div>
        );
    }
}