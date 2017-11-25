import {Component} from 'react';

import S from './style.scss';

export default class Aside extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let {noteBooks,location,noteBooksClick} = this.props;

        let {user_intro} = location.state;

        noteBooks = noteBooks.map((ele,i)=>{
            let {id:collection_id,collection_name} = ele;

            return(
                <div className="item" key={i}>

                    <i className="book icon"></i>

                    <div
                        className="content"
                        style={{cursor:"pointer"}}
                        onClick={()=>{
                            noteBooksClick({},collection_id,collection_name)
                        }}
                    >
                        {collection_name}
                    </div>

                </div>

            )
        })

        return (
            <div className={S.aside}>
                <div className="introduce">
                    <div className="title">
                        个人介绍
                        <div className="ui divider hidden">
                            <p>{user_intro}</p>
                        </div>
                    </div>
                </div>
                <div className="ui divider hidden"></div>
                <div className={S.volume}>
                    <div className={S.title}>
                        我的文集
                    </div>
                    <div className="ui list">
                        {noteBooks}
                    </div>
                </div>
            </div>
        );
    }
}
