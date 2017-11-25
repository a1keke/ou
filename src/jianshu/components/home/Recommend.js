import {Component} from 'react';
import S from './style.scss';
import Author from './Author';
export default class Recommend extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {authors,initMyPage} = this.props;
        return (
            <div className={S.recommend}>
                <div className={S.title}>
                    <span>作者列表</span>
                </div>
                <div className="ui items">
                    {
                        authors.map((elt, i)=>{
                            return (
                                <Author
                                    {...{
                                        user: elt,
                                        initMyPage
                                    }}
                                    key={i}
                                />);
                        })
                    }
                </div>
            </div>
        );
    }
}
