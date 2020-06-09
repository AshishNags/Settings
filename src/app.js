import React from 'react';
import ReactDOM from 'react-dom';
import Switch from 'react-switch';
import Brigthness from './brigth.js';
import Bluetooth from './bluetooth';
import './index.css';
import axios from 'axios';

class App extends React.Component{
    constructor(){
		super()
		
		this.forceUpdate();
        this.state={
			check:false,
			bright:0,
			count:0
		}
		var data,che,co;
		axios.get('http://localhost:6050/bright')
		.then((resp)=>{
			data=resp.data[0].value
			this.setState({bright:data})
		})
		axios.get('http://localhost:6050/voice')
		.then((resp)=>{
			che=resp.data[0].check
			this.setState({check:che})
		})
		axios.get('http://localhost:6050/count')
		.then((resp)=>{
			co=resp.data[0].connected
			this.setState({count:co})
		})
		
	}

	componentWillMount(){
		
	}
    handleSwitch(){
        this.setState({
            check: !this.state.check
		})
		
		axios.put('http://localhost:6050/voice/1/',{"check":!this.state.check})
		.then((resp)=>{
			console.log(resp.data)
		})
		.catch(err=>{console.log(err)})
    }
    bright(){
        ReactDOM.render(<Brigthness brig={this.state.bright}/>, document.getElementById('root'));
	}
	blue(){
        ReactDOM.render(<Bluetooth/>, document.getElementById('root'));
	}
	render(){
		return(
			<div className="container">
			<h1>Settings</h1>
			<table className="center">
				<tr>
		<th colSpan="2" id="th"><label><div className="ok"><button id="bu" onClick={this.bright.bind(this)}>Brightness</button><div className="but">{this.state.bright}</div></div></label></th>
				</tr>
				<tr>
					<th colSpan="2" id="th"><label><div className="ok"><button id="bu" onClick={this.blue.bind(this)}>Bluetooth Setup</button><div className="but">{this.state.count}</div></div></label></th>
				</tr>
				<tr>
					<th colSpan="2" id="th"><label><div className="voi"> Voice over </div><Switch className="sw" onChange={this.handleSwitch.bind(this)} checked={this.state.check} uncheckedIcon={false} /></label></th>
				</tr>
			</table>
			</div>
		)
	}
}
export default App;