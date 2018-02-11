import React,{Component} from 'react';
import json from './../../../../static/json/heroes.json';
import {Redirect} from 'react-router-dom';
export default class HeroDetail extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {name} = this.props;
        let hero = json.heroes.filter((ele,i)=>{
            return ele.url===name
        })
        if(!hero.length){
            return <Redirect to='/kele' />
        }
        console.log(hero);
        let {name:_name,imgSrc,info,skills} = hero[0];
        let infoDOM = info.map((ele,i)=>{
            return (
                <div className="item" key={i}>
                    <i className="bar icon"></i>
                    <div className="content">
                        <div className="description">{ele}</div>
                    </div>
                </div>
            )
        });
        let skillsDOM = skills.map((ele,i)=>{
            return (
                <div className="item" key={i}>
                    <i className="bar icon"></i>
                    <div className="content">
                        <div className="description">{ele}</div>
                    </div>
                </div>
            )
        })
        return (
            <div className="ui items">
                <div className="item">
                    <div className="ui medium image">
                        <img src={imgSrc} />
                    </div>
                    <div className="content">
                        <div className="header">{_name} </div>
                        <div className="ui list large ">
                            <div className="item">
                                <i className="bar icon"></i>
                                <div className="content">
                                    <div className="header">info</div>
                                    <div className="list">
                                        {infoDOM}
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <i className="bar icon"></i>
                                <div className="content">
                                    <div className="header">skills</div>
                                    <div className="list">
                                        {skillsDOM}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
