import {Component} from 'react';

import {Link,withRouter} from 'react-router-dom';

import S from './style.scss';

class Preview extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {
            article_id,
            article_title,
            previewContent,
            user_id,
            user_name,
            createdAt,
            avatar,
            user_intro,
            initMyPage,
            history
        } = this.props;
        createdAt = new Date(createdAt).toLocaleString();
        return (
            <div className={`${S.note}`}>
                <div className="ui divider hidden"></div>
                <div className={`${S.content}`}>
                    <div className={`${S.author}`}>
                        <Link to="/jianshu/my_page"
                              className="avatar"
                              onClick={(ev)=>{
                                  ev.stopPropagation();
                                  ev.preventDefault();
                                  history.push("/jianshu/my_page",{
                                      user_name,
                                      avatar,
                                      user_intro,
                                      user_id
                                  })
                                  initMyPage({user_id},{user_id},'所有文章');
                              }}
                        >
                            <img src={avatar} alt="" className="ui avatar image"/>
                        </Link>
                        <div className={`${S.name}`}>
                            <Link to="/jianshu">{user_name}</Link>
                            <span className="time">{createdAt}</span>
                        </div>
                    </div>
                    <Link to="/jianshu" className={S.title}>{article_title}</Link>
                    <p className={S.abstract}>
                        {previewContent}
                    </p>
                    <div className={S.meta}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Preview);
