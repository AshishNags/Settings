import React from 'react';
import data from './data.json';
import { IoMdArrowBack } from "react-icons/io";
import Bluetooth from './bluetooth';
import ReactDOM from 'react-dom';
import axios from 'axios';


class NewDevice extends React.Component{
    constructor(){
        super()
        
        this.state={
            blut:[]
        }
        
        var blut;
        axios.get('http://localhost:6050/others')
        .then((resp)=>{
            blut=resp.data
            this.setState({blut:blut})
        })
        
    }
    back(){
        ReactDOM.render(<Bluetooth />, document.getElementById('root'));
    }
    add(dev){
        var inde
        var z =this.state.blut;
        for (let i = 0; i < z.length; i++) {
            if(z[i].id===dev.id){
                inde=i
            }
        }
        z.splice(inde,1);
        this.setState({blut:z})
        this.forceUpdate();
        
        axios.delete('http://localhost:6050/others/'+dev.id+'/')
        .then(resp=>{console.log(resp.data);})
        .catch(err=>{console.log(err);})
        this.props.stUpd(dev);
        
    }
    done(){
        ReactDOM.render(<Bluetooth />, document.getElementById('root'));
    }
    render(){
        let ele=[];
        var blu=this.state.blut
        blu.forEach((dev) => {
            ele.push(<div><tr><th className="blna" style={{fontSize:"20px"}} onClick={this.add.bind(this,dev)}><u >
                {dev.pet}</u></th></tr><tr><td>{dev.name}</td></tr><hr/></div>)
        });
        return(
            <div className="cont">
               <IoMdArrowBack onClick={this.back.bind(this)} size="30"/><br/><br/>
                <table className="blutab" style={{width:"300px"}}><hr/>
                {ele}
                </table>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<input type="button" value="Done" onClick={this.done.bind(this)} style={{width:"60px", fontSize:"15px"}}/>
            </div>
        )
    }
}
export default NewDevice;