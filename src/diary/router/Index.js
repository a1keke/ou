import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {fetchBaseInfo} from '../redux/action/index.js';
import {connect} from 'react-redux';
import Header from '../components/header/Header.js';
import Toast from '../components/toast/Toast.js';
import Login from '../components/login/Login.js';
import SignUp from '../components/signUp/SignUp.js';
import Index from '../view/index/Index.js';
import DetailDiary from '../view/detailDiary/DetailDiary.js';
import ConnectPage from '../view/connectPage/ConnectPage.js';
class ApDiary extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        let {appVersion,platform} = navigator;
        this.props.fetchBaseInfo({appVersion,platform});
    }
    render(){
        return (
            <BrowserRouter >
                <div>
                    <Route path="/diary" component={Header} />
                    <Route path="/diary" component={Toast} />
                    <Route path="/diary" exact component={Index}/>
                    <Route path="/diary/user/login" component={Login} />
                    <Route path="/diary/user/signup" component={SignUp} />
                    <Route path='/diary/connect' component={ConnectPage}/>
                    <Route path="/diary/detail/:title" exact component={DetailDiary}/>
                </div>
            </BrowserRouter>
        );
    }
}


function mapStateToProps(state) {
    let {isBase,isFetching} = state.fetchReducer;
    return{isBase,isFetching}
}
function mapDispatchToProps(dispatch) {
    return{
        fetchBaseInfo:postData=>dispatch(fetchBaseInfo(postData))
    }
}

const App = connect(mapStateToProps,mapDispatchToProps)(ApDiary);


export default App;
