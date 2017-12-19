import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {fetchBaseInfo} from '../redux/action/Index.js';
import {connect} from 'react-redux';
import Header from '../components/header/Header.js';

import Index from '../view/index/Index.js';

import DetailDiary from '../view/detailDiary/DetailDiary.js';
class ApDiary extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        let {appVersion,platform} = navigator;
        this.props.fetchBaseInfo({appVersion,platform});
    }
    render(){
        let {isbase} = this.props;
        return (
            <BrowserRouter >
                <div>
                    {/*{isbase}*/}
                    {/*<Route path="/diary" component={Header} />*/}
                    {/*<Route path="/diary" exact component={Index}/>*/}
                    {/*<Route path="/diary/:title" component={DetailDiary}/>*/}
                </div>
            </BrowserRouter>
        );
    }
}


function mapStateToProps(state) {
    let {isBase,isFetching} = state.root;
    return{isBase,isFetching}
}
function mapDispatchToProps(dispatch) {
    return{
        fetchBaseInfo:postData=>dispatch(fetchBaseInfo(postData))
    }
}

const App = connect(mapStateToProps,mapDispatchToProps)(ApDiary);


export default App;
