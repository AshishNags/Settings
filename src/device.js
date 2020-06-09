import React from 'react';
import ReactDOM from 'react-dom';
import { FaPen,FaHeadphones } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import Volume from './volume';
import AddPet from './addpet.js';
import axios from 'axios';
import Bluetooth from './bluetooth';


class Device extends React.Component{
    constructor(props){
        super(props)
        
    }
    volume(nam){
        ReactDOM.render(<Volume nam={nam}/>, document.getElementById('root'));
    }
    petname(nam){
        console.log(nam);
        ReactDOM.render(<AddPet nam={nam}/>, document.getElementById('root'));
    }
    pair(devi){
        console.log(devi.connected)
        var up= !devi.connected;
        console.log(up)
        axios.put('http://localhost:6050/bluetooth/'+devi.id+'/',
        {
            "name":devi.name,
            "pet":devi.pet,
            "paired":devi.paired,
            "connected":up,
            "volume":devi.volume
        })
        .then((resp)=>{
            console.log(resp.data)
        })
        .catch(err=>{console.log(err)})
        ReactDOM.render(<Bluetooth/>, document.getElementById('root'));
    }
    delete(){
        alert("deleted");
    }
    render(){
        var dev = this.props.dev;
        return(
            <div>
                <tr><td rowSpan="2" className="valign"><FaHeadphones onClick={this.volume.bind(this,dev.name)} size='25'/>&emsp;</td><th className="blna"><u onClick={this.pair.bind(this,dev)}>
                {dev.name}</u></th><td rowSpan="2" className="valign">&emsp;&emsp;<FaPen onClick={this.petname.bind(this,dev.name)}/></td><td rowSpan="2" className="valign">&emsp;
                <MdDelete size="20" onClick={this.delete.bind(this,dev.name)}/></td></tr><tr><td>{dev.pet}</td></tr><hr/>
            </div>
        )
    }
    
}

export default Device;