import React, {Component} from 'react';
import './styles/Content.css'

import { home } from '../assets/datos_prueba.json'

class Content extends Component{
    constructor(){
        super();
        this.state = {
            home,
        };
    }
    
    render(){
        return(
            <div className="container">
                <div className="d-flex justify-content-center ">
                    <div className="card card-mod">
                        <img className="card-img-top" src={require("../assets/img/imagen-card1.jpg")} alt="card image cap"></img>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">Lorem ipsum dolor</h6>
                            <p className="card-text font-weight-bold">12$/h · <span className="texto-dis">2,3 km de mi</span></p>
                        </div>
                    </div>

                    <div className="card card-mod">
                        <img className="card-img-top" src={require("../assets/img/imagen-card1.jpg")} alt="card image cap"></img>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">Lorem ipsum dolor</h6>
                            <p className="card-text font-weight-bold">12$/h · <span className="texto-dis">2,3 km de mi</span></p>
                        </div>
                    </div>
                    <div className="card card-mod">
                        <img className="card-img-top" src={require("../assets/img/imagen-card1.jpg")} alt="card image cap"></img>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">Lorem ipsum dolor</h6>
                            <p className="card-text font-weight-bold">12$/h · <span className="texto-dis">2,3 km de mi</span></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;