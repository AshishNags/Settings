import React from 'react';
import ReactDOM from 'react-dom';
import Bluetooth from './bluetooth';


class Refresh extends React.Component{
    constructor(){
        super()
        
    }
    componentWillMount(){
        ReactDOM.render(<Bluetooth/>, document.getElementById('root'));
    }
}

export default Refresh;