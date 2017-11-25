import React,{Component} from 'react';
import S from './header.scss';
export default class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {bookname,chaptername,bid} = this.props;
        let booknameArea = bookname?(

                <div className={`${S.overflow} ${S.fs}`}>
                    <i className="right chevron icon divider"></i>
                    <a className="section" href={`/biquge/${bid}`}>{bookname}</a>
                </div>
            ):null;
        let chapternameArea = chaptername?(
            <div className={S.overflow}>
                <i className="right chevron icon divider"></i>
                <a className="section">{chaptername}</a>
            </div>
        ):null;
        return (
            <div className={`ui breadcrumb fixed menu ${S.lh}`}>
                <a className={`section ${S.pl}`} href="/biquge">Home</a>
                {booknameArea}
                {chapternameArea}
            </div>
        );
    }
}
