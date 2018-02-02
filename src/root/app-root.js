import React,{Component} from 'react';
import ReactDOM from "react-dom";
class Root extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className='pusher'>
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <div className="ui large secondary inverted pointing menu">
                            <a className="item active">Home</a>
                            <a className="item" href='/diary'>Diary</a>
                            <a className="item" href='/biquge'>Book</a>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
ReactDOM.render(
    <Root />,
    document.getElementById('root')
)