import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Slider from 'react-slider-simple';
import { IoMdArrowBack } from "react-icons/io";
import { TiAdjustBrightness } from "react-icons/ti";
import { TiWeatherSunny } from "react-icons/ti";
import axios from 'axios';


class Brigthness extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:props.brig
        }
    }
    handler(value){
        let valu=value;
        this.setState({
            value:valu
        })
    }
    back(){
        
        let val= Math.round(this.state.value);
        axios.put('http://localhost:6050/bright/1/',
        {"value":val})
        .then(resp=>{console.log(resp.data);})
        .catch(err=>{console.log(err);})
        
        this.forceUpdate();
        this.redrect();
        
    }
    redrect(){
        ReactDOM.render(<App />, document.getElementById('root'));
    }
    render(){
        var va = Math.round(this.state.value);
        return(
            <div className="cont">
                <IoMdArrowBack onClick={this.back.bind(this)} size="30"/><br/><br/>
                <div>
                    &emsp;<TiWeatherSunny size="20"/>&nbsp;
                    <div className="slider">
                        <Slider value={this.state.value} onChange={this.handler.bind(this)}/>
                    </div><TiAdjustBrightness size="20"/>
                </div>
                <br></br>
                <div style={{textAlign:"center"}}>Brigthness:&nbsp;{va}%</div>
            </div>
        )
    }
}
export default Brigthness;