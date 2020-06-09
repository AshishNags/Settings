import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import Bluetooth from './bluetooth';
import ReactDOM from 'react-dom';
import axios from 'axios';


class AddPet extends React.Component{
    constructor(props){
        super(props)
        this.state={
            pet:''
        }

    }
    handle(e){
        var val=e.target.value
        this.setState({pet:val})
        console.log(this.state.pet)
    }
    done(){
        var pe= this.state.pet
        var de = this.props.de;
        axios.put('http://localhost:6050/bluetooth/'+de.id+'/',
        {
            "name":de.name,
            "pet":pe,
            "paired":de.paired,
            "connected":de.connected,
            "volume":de.volume
        })
        this.props.stchange(de,pe);
        this.redrect();
        
    }
    redrect(){
        ReactDOM.render(<Bluetooth />, document.getElementById('root'));
    }
    back(){
        ReactDOM.render(<Bluetooth />, document.getElementById('root'));
    }
    render(){
        return(
            <div className="cont">
               <IoMdArrowBack onClick={this.back.bind(this)} size="30"/><br/><br/>
               <div style={{textAlign:"center"}}>
                <h2 >{this.props.de.name}<br/><br/>Enter Friendly Name: <input type="text" value={this.state.pet} onChange={this.handle.bind(this)}/></h2>
                <br/>
                <input type="button" value="Done" onClick={this.done.bind(this)} style={{width:"60px", fontSize:"15px"}}/>
                </div>
            </div>
        )
    }
}
export default AddPet;