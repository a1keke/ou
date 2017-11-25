import {Link ,withRouter} from 'react-router-dom';
import Preview from './Preview';
import S from './style.scss';
import config from '../../common/config/config';
import {Component} from 'react';

class PreviewList extends Component{
    constructor(props){
        super(props);
    }


    render(){
        let {previewList,initMyPage,history,onCollectionClick} = this.props;

        previewList = previewList.map((elt, i)=>{
            let {
                id: article_id, article_title, createdAt,
                preview: previewContent,
                collection_name,
                user_id,
                collection_id,
                user
            } = elt;

            let {avatar, user_name, user_intro} = user;

            avatar = config.url + avatar;

            return (
                <Preview
                    {...{
                        article_id,
                        article_title,
                        previewContent,
                        user_id,
                        user_name,
                        createdAt,
                        avatar,
                        user_intro,
                        initMyPage
                    }}
                    key={i}
                >
                    {
                        collection_id?(
                            <Link to="/jianshu/my_page"
                                  className={S.tag}
                                  onClick={(ev)=>{
                                      ev.stopPropagation();
                                      ev.preventDefault();
                                      history.push("/jianshu/my_page",{
                                          user_name,
                                          avatar,
                                          user_intro,
                                          user_id
                                      })
                                      onCollectionClick(user_id,collection_id,collection_name);
                                  }}
                            >{collection_name}</Link>
                        ):(null)
                    }
                </Preview>
            );
        });
        return (
          <div>
              {previewList}
          </div>
        );
    }
}
export default withRouter(PreviewList);


