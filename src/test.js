import React from 'react';
import axios from 'axios';

class App extends React.Component{
    constructor(){
        super()
        this.state={
            name:''
        }
    }

    ch(e){
        this.setState({
            name:e.target.value
        })
    }
    ok(){

        axios.post('http://localhost:6050/about/1/',{"name":this.state.name})
        .then(resp=>{
            console.log(resp);
        })
        .catch((err)=>{console.log(err);})
    }
    

    render(){
        return(
            <div>
            {this.state.name}<br/>
            <input type="text" value={this.state.name} onChange={this.ch.bind(this)} />
            <button onClick={this.ok.bind(this)}> Ok</button>
            </div>
        )
    }
}
export default App;