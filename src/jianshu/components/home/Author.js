import {Component} from 'react';

import {Link,withRouter} from 'react-router-dom';

import config from '../../common/config/config';

class Author extends Component{
    constructor(props){
        super(props);
    }
    render(){
        
        let {history,initMyPage} = this.props;
        
        let {user_name, avatar,user_intro,id:user_id} = this.props.user;

        avatar = config.url + avatar;

        return (
            <div className="item">
                <Link
                    to="/jianshu/my_page"
                    className="ui mini avatar image"
                    onClick={(ev)=>{
                        ev.stopPropagation()
                        ev.preventDefault();
                        history.push("/jianshu/my_page",{
                            user_name,
                            avatar,
                            user_intro,
                            user_id
                        });
                        initMyPage({user_id},{user_id},'所有文章');

                    }}
                >
                    <img src={avatar} alt=""/>
                </Link>
                <div className="content">
                    <div className="header">
                        {user_name}
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Author);

