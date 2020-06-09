import React from 'react';
import Slider from 'react-slider-simple';
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeDown } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import Bluetooth from './bluetooth';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Volume extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props.de.name);
        
        this.state={
            value:0
        }
        var va;
        axios.get('http://localhost:6050/bluetooth/'+props.de.id+'/')
        .then((resp)=>{
            va=resp.data.volume
            console.log(va)
            this.setState({value:va})
        })
    }
    handler(value){
        let valu=value;
        this.setState({
            value:valu
        })
        console.log(this.state.value)
    }
    back(){
        var de = this.props.de;
        var va = Math.round(this.state.value);
        axios.put('http://localhost:6050/bluetooth/'+de.id+'/',
        {
            "name":de.name,
            "pet":de.pet,
            "paired":de.paired,
            "connected":de.connected,
            "volume":va
        })
        this.redrect();
        
    }
    redrect(){
        ReactDOM.render(<Bluetooth />, document.getElementById('root'));
    }
    render(){
        var va = Math.round(this.state.value);
        return(
            <div className="cont">
                <IoMdArrowBack onClick={this.back.bind(this)} size="30"/><br/><br/>
                <h2 style={{textAlign:"center"}}>{this.props.de.pet}</h2>
                <div>
                    
                    &emsp;<FaVolumeDown size="20"/>&nbsp;
                    <div className="slider">
                        <Slider value={this.state.value} onChange={this.handler.bind(this)}/>
                    </div><FaVolumeUp size="20"/>
                </div>
                <br></br>
                <div style={{textAlign:"center"}}>Volume:&nbsp;{va}</div>
            </div>
        )
    }
}
export default Volume;