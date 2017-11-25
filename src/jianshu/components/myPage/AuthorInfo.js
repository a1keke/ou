import {Component} from 'react';

import S from './style.scss';

import {Link,withRouter} from 'react-router-dom';

class AuthorInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let {location,history,initMyPage} = this.props;

        let {avatar,user_name,user_id,user_intro} = location.state;

        console.log(location);

        return (
            <div className={S.author_info}>
                <Link to="/jianshu/my_page"
                      className={S.avatar}
                      onClick={(ev)=>{
                          ev.stopPropagation();
                          ev.preventDefault();

                          history.push("/jianshu/my_page",{avatar,user_name,user_id,user_intro});
                          initMyPage({user_id},{user_id},'所有文章');
                      }}
                >
                    <img src={avatar} />
                </Link>
                <div className={S.title}>
                    <span
                          className={S.name}
                    >
                        {user_name}
                    </span>
                </div>
            </div>
        );
    }
}
export default withRouter(AuthorInfo);

