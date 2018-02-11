import React,{Component} from 'react';
import Hero from './../hero/Hero.js';
export default class HeroList extends Component{
    constructor(props){
        super(props);
        this.renderHero = this.renderHero.bind(this);
    }
    renderHero(){
        return this.props.heroes.map((ele,i)=>{
            return <Hero {...ele} key={i}></Hero>
        })
    }
    render(){
        return (
            <div className="ui link cards eight doubling">
                {this.renderHero()}
            </div>
        );
    }
}
