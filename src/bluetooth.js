import React from 'react';
import ReactDOM from 'react-dom';
import { FaPen,FaHeadphones } from 'react-icons/fa';
import { IoMdAdd } from "react-icons/io";
import AddPet from './addpet.js';
import Volume from './volume';
import NewDevice from './newdevice';
import { IoMdArrowBack } from "react-icons/io";
import App from './app.js';
import { MdDelete } from "react-icons/md";
import axios from 'axios';



class Bluetooth extends React.Component{
    constructor(){
        super()
        
        this.state={
            blut:[],
            cou:[]
        }
        this.stchange=this.stchange.bind(this)
        this.stUpd= this.stUpd.bind(this)
        var blut;
        axios.get('http://localhost:6050/bluetooth')
        .then((resp)=>{
            blut=resp.data
            this.setState({blut:blut})
        })
        axios.get('http://localhost:6050/count')
        .then(resp=>{
            this.setState({cou:resp.data})
        })
        this.forceUpdate();
    }
    stchange(de,pe){
        
        var y =this.state.blut;
        for (let i = 0; i < y.length; i++) {
            if(y[i].id===de.id){
                y[i].pet=pe
            }
            
        }
        this.setState({blut:y})
        console.log(this.state.blut)
        this.upd();
    }
    upd(){
        this.forceUpdate();
        this.forceUpdate();

    }
    stUpd(de){
        console.log(de)
        var stu =[...this.state.blut, de];
        console.log(stu)
        this.setState({blut:stu})
        axios.post('http://localhost:6050/bluetooth',
        {
            "name":de.name,
            "pet":de.pet,
            "paired":true,
            "connected":false,
            "volume":de.volume,
            "id":de.id
        })
        .then(resp=>{console.log(resp.data);})
        .catch(err=>{console.log(err);})
        
        var du=this.state.cou
        du[0].paired=du[0].paired+1
        this.setState({cou:du})
        console.log(this.state.cou)
        axios.put('http://localhost:6050/count/1/',
        {
            "paired":du[0].paired,
            "connected":du[0].connected
        }).then(resp=>{console.log(resp.data)})
        .catch(err=>{console.log(err)})
        this.forceUpdate();
        console.log(this.state.blut)
    }
    petname(de){
        console.log(de.name);
        ReactDOM.render(<AddPet de={de} stchange={this.stchange} />, document.getElementById('root'));
    }
    upda(can,devi,up){
        if(can===true){
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
            var x =this.state.blut;
            for (let i = 0; i < x.length; i++) {
                if(x[i].id===devi.id){
                    x[i].connected=up
                }
                
            }
            this.setState({blut:x})
        }
        else(
            alert("Cannot connect more than 2 devices")
        )
    }
    pair(devi){
        var co= this.state.cou[0].connected
        var can=false;
        var up= !devi.connected;
        console.log(up)
        if(up===false){
            can=true
            var du=this.state.cou
            du[0].connected=du[0].connected-1
            this.setState({cou:du})
            console.log(this.state.cou)
            axios.put('http://localhost:6050/count/1/',
            {
                "paired":du[0].paired,
                "connected":du[0].connected
            }).then(resp=>{console.log(resp.data)})
            .catch(err=>{console.log(err)})
        }
        else{
            if(co<2){
                can=true
                var du=this.state.cou
                du[0].connected=du[0].connected+1
                this.setState({cou:du})
                console.log(this.state.cou)
                axios.put('http://localhost:6050/count/1/',
                {
                    "paired":du[0].paired,
                    "connected":du[0].connected
                }).then(resp=>{console.log(resp.data)})
                .catch(err=>{console.log(err)})
            }
            else{
                can=false
            }
        }
        this.upda(can,devi,up);
        
        
    }
    volume(de){
        ReactDOM.render(<Volume de={de}/>, document.getElementById('root'));
    }
    addNew(){
        var p=this.state.cou[0].paired
        if(p<10){
            ReactDOM.render(<NewDevice stUpd={this.stUpd}/>, document.getElementById('root'));
        }
        else{
            alert("Cannot pair more than 10 devices")
        }
        
    }
    back(){
        ReactDOM.render(<App />, document.getElementById('root'));
    }
    delete(devi){
        console.log(this.state.blut)
        var inde
        var z =this.state.blut;
        for (let i = 0; i < z.length; i++) {
            if(z[i].id===devi.id){
                inde=i
            }
        }
        z.splice(inde,1);
        this.setState({blut:z})
        this.forceUpdate();
        axios.post('http://localhost:6050/others',
        {
            "name":devi.name,
            "pet":devi.pet,
            "paired":false,
            "connected":false,
            "volume":devi.volume,
            "id":devi.id
        }).then((resp)=>{console.log(resp.data);})
        .catch(err=>{console.log(err);})

        axios.delete('http://localhost:6050/bluetooth/'+devi.id+'/')
        .then(resp=>{console.log(resp.data);})
        .catch(err=>{console.log(err);})

        var du=this.state.cou
            du[0].paired=du[0].paired-1
            this.setState({cou:du})
            console.log(this.state.cou)
            axios.put('http://localhost:6050/count/1/',
            {
                "paired":du[0].paired,
                "connected":du[0].connected
            }).then(resp=>{console.log(resp.data)})
            .catch(err=>{console.log(err)})
    }
    render(){
        let ele=[];
        var blut=this.state.blut
        blut.forEach((dev) => {
            if(dev.connected===true){
                ele.push(<div><tr><td rowSpan="2" className="valign"><FaHeadphones onClick={this.volume.bind(this,dev)} size='25' color="aqua"/>&emsp;</td><th className="blna"><u onClick={this.pair.bind(this,dev)}>
                    {dev.pet}</u></th><td rowSpan="2" className="valign">&emsp;&emsp;<FaPen onClick={this.petname.bind(this,dev)}/></td><td rowSpan="2" className="valign">&emsp;
                    <MdDelete size="20" onClick={this.delete.bind(this,dev)}/></td></tr><tr><td>{dev.name}</td></tr><hr/></div>)
            }
        });
        blut.forEach((dev) => {
            if(dev.connected===false){
                ele.push(<div><tr><td rowSpan="2" className="valign"><FaHeadphones onClick={this.volume.bind(this,dev)} size='25'/>&emsp;</td><th className="blna"><u onClick={this.pair.bind(this,dev)}>
                    {dev.pet}</u></th><td rowSpan="2" className="valign">&emsp;&emsp;<FaPen onClick={this.petname.bind(this,dev)}/></td><td rowSpan="2" className="valign">&emsp;
                    <MdDelete size="20" onClick={this.delete.bind(this,dev)}/></td></tr><tr><td>{dev.name}</td></tr><hr/></div>)
            }
        });
        return(
            <div className="cont" style={{marginTop:"50px"}}>
                
               <IoMdArrowBack onClick={this.back.bind(this)} size="30"/><br/><br/>
               <div style={{textAlign:"center"}}>
                <label onClick={this.addNew.bind(this)} >
                    <IoMdAdd size='20'/>
                <u>Add New Device</u>
                </label></div><br/>
                <table className="blutab"><hr/>
                {ele}
                </table>
                
            </div>
        )
    }
}
export default Bluetooth;