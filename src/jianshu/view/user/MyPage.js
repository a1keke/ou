import {Component} from 'react';

import AuthorInfo from '../../components/myPage/AuthorInfo';

import Aside from '../../components/myPage/Aside';

import PreviewList from '../../layout/preview/PreviewList';

export default class MyPage extends Component{
    constructor(props){
        super(props);
        this.onCollectionClick = this.onCollectionClick.bind(this);
        this.noteBooksClick = this.noteBooksClick.bind(this);
    }
    onCollectionClick(user_id,collection_id,collection_name){

        let {getPreview} = this.props;

        getPreview({collection_id},collection_name);

    }
    noteBooksClick(user_id,collection_id,collection_name){

        let {onCollectionClick} = this;

        onCollectionClick(user_id,collection_id,collection_name);

    }

    render(){
        let {onCollectionClick,noteBooksClick} = this;

        let{myPagePreview,noteBooks,previewName,location,initMyPage} = this.props;

        return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo {...{location,initMyPage}}/>
                    <div className="ui secondary pointing menu">
                        <span className="active item">
                            {previewName}
                        </span>
                    </div>
                    <PreviewList {...{previewList:myPagePreview,initMyPage,onCollectionClick}}/>
                </div>
                <div className="four wide column">
                    <Aside {...{noteBooks,location,noteBooksClick}}/>
                </div>
            </div>
        );
    }
}
