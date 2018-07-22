import React from 'react';
import ReactDOM from "react-dom";
import S from './index.scss';

const initState = {
    //data
    zhenzhizhijing: '',
    jishangzongmi: '',
    zhenjushu: '',
    zhenju: '',
    quanhu: '',
    //result
    quanzhu: '',
    yanzhanxian: '',
    xianquanchangdu: '',
    songjingliang: '',
    isSpecial:false,
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({},initState);
        this.calc = this.calc.bind(this);
        this.changeCalcCon = this.changeCalcCon.bind(this);
        this.reset = this.reset.bind(this);
    }
    changeCalcCon(){
        this.setState({isSpecial:!this.state.isSpecial});
    }
    calc() {
        const {zhenzhizhijing, jishangzongmi, zhenjushu, zhenju,isSpecial} = this.state;
        if (!zhenzhizhijing || !jishangzongmi || !zhenjushu || !zhenju) {
            return false;
        }
        let quanhu = (3.1415926 * zhenzhizhijing) / 2.2;
        let quanzhu = 10 / jishangzongmi;
        let yanzhanxian = zhenjushu * zhenju;
        let xianquanchangdu = 0;
        if(isSpecial){
            xianquanchangdu = 2*quanhu + 4 * quanzhu + yanzhanxian
        }else {
            xianquanchangdu = quanhu + 2 * quanzhu + yanzhanxian
        }
        let songjingliang = 480 * xianquanchangdu;
        quanhu = quanhu.toFixed(2);
        quanzhu = quanzhu.toFixed(2);
        yanzhanxian = yanzhanxian.toFixed(2);
        xianquanchangdu = xianquanchangdu.toFixed(2);
        songjingliang = songjingliang.toFixed(2);
        this.setState({quanhu, quanzhu, yanzhanxian, xianquanchangdu, songjingliang});
    }
    reset(){
        this.setState(initState);
    }
    render() {
        const {zhenzhizhijing, jishangzongmi, zhenjushu, zhenju, quanhu, quanzhu, yanzhanxian, xianquanchangdu, songjingliang,isSpecial} = this.state;
        return (
            <div className={`ui container`} style={{padding:'2em 0'}}>
                <h2 className='ui dividing header'>
                    计算送径量
                </h2>
                <div className='ui three column grid'>
                    <div className='row'>
                        <div className='column'>
                            圈弧:{quanhu}
                        </div>
                        <div className='column'>
                            圈柱:{quanzhu}
                        </div>
                        <div className='column'>
                            延展线:{yanzhanxian}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='column'>
                            线圈长度:{xianquanchangdu}
                        </div>
                        <div className='column'>
                            送径量:{songjingliang}
                        </div>
                    </div>
                </div>
                <h2 className='ui dividing header'>
                    输入数据
                </h2>
                <div className={`ui labeled input column ${S.flex}`}>
                    <a className='ui label'>针织直径</a>
                    <input type="number" value={zhenzhizhijing}
                           onChange={e => this.setState({zhenzhizhijing: e.target.value})}/>
                </div>
                <div className={`ui labeled input column ${S.flex}`}>
                    <a className='ui label'>机上纵密</a>
                    <input type="number" value={jishangzongmi}
                           onChange={e => this.setState({jishangzongmi: e.target.value})}/>
                </div>
                <div className={`ui labeled input column ${S.flex}`}>
                    <a className='ui label'>针距数</a>
                    <input type="number" value={zhenjushu} onChange={e => this.setState({zhenjushu: e.target.value})}/>
                </div>
                <div className={`ui labeled input column ${S.flex}`}>
                    <a className='ui label'>针距</a>
                    <input type="number" value={zhenju} onChange={e => this.setState({zhenju: e.target.value})}/>
                </div>
                <div className={`${S.flex}`}>
                    <span className={`${S.radio} ${isSpecial?S["radio-checked"]:''}`} onClick={this.changeCalcCon}></span>
                    <span onClick={this.changeCalcCon}>重经组织沉降弧等于一个针距</span>
                </div>
                <div className={`ui three column grid ${S.m0}`}>
                    <div className='row'>
                        <button className='ui primary button column' onClick={this.calc}>计算</button>
                        <button className='ui right floated primary button column' onClick={this.reset}>清空</button>
                    </div>
                </div>
                <h2 className='ui dividing header'>
                    计算公式
                </h2>
                <p>送径量 = 480 * 一个线圈长度</p>
                <p>线圈长度 = 圈弧 + 2*圈柱 +延展线</p>
                <p>圈弧 = (π * 针织直径)/2.2</p>
                <p>圈柱 = 10/机上纵密</p>
                <p>延展线 = 针距数 * 针距</p>
                <p>注意：当重经组织沉降弧等于一个针距时，线圈长度 = 2*圈弧 + 4*圈柱 + 延展线</p>
                <h2 className='ui dividing header'>
                    潘斌
                </h2>
                <img className='ui fluid image' src="/static/resource/panbinBG.jpg" />
            </div>

        );
    }
}
ReactDOM.render(<Index/>, document.getElementById('root'));