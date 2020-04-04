import React, { Component } from 'react';
import Map from './Map'

class Pruebas extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div style={{width: '100vw', height: '100vh'}}>
                <Map />
            </div>
         );
    }
}
 
export default Pruebas;