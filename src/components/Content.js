import React, {Component} from 'react';
import './styles/Content.css'

import { home } from '../assets/datos_prueba.json'

class Content extends Component{
    constructor(){
        super();
        this.state = {
            home,
            auth: false
        };
    }
    
    generador(){
        if (this.state.auth) {
            return (
                <div className="d-flex justify-content-center flex-wrap">
                    {this.state.home.map( (e) => {
                        return(
                            <div className="card card-mod">
                                <img className="card-img-top" alt={e.alt} src={require("../assets/img/"+e.path_image)}></img>
                                <div className="card-body card-mod-text">
                                    <h6 className="card-text mt-1 font-weight-bold">{e.title}</h6>
                                    <p className="card-text font-weight-bold">{e.precio}$/h · <span className="texto-dis">{e.distancia} km de mi</span></p>
                                </div>
                            </div>
                        )
                    })}
                </div>
             ) 
        }else{
            return (
                <div className="d-flex justify-content-center flex-wrap">
                    <div className="card card-mod">
                        <img className="card-img-top" src={require("../assets/img/imagen-card1.jpg")} alt="card cap"></img>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">Deporte</h6>
                            <p className="card-text font-weight-bold">12$/h · <span className="texto-dis">2,1 km de mi</span></p>
                        </div>
                    </div>
                    <div className="card card-mod">
                        <img className="card-img-top" src={require("../assets/img/imagen-card2.jpg")} alt="card cap"></img>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">Deporte</h6>
                            <p className="card-text font-weight-bold">12$/h · <span className="texto-dis">2,1 km de mi</span></p>
                        </div>
                    </div>
                    <div className="card card-mod">
                        <img className="card-img-top" src={require("../assets/img/imagen-card3.jpg")} alt="card cap"></img>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">Deporte</h6>
                            <p className="card-text font-weight-bold">12$/h · <span className="texto-dis">2,1 km de mi</span></p>
                        </div>
                    </div>
                    {/* Aqui comienza la mitad ocapada */}
                    
                    <div className="card card-mod sin-auth">
                        <img className="card-img-top" src={require("../assets/img/imagen-card1.jpg")} alt="card cap"></img>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">Deporte</h6>
                            <p className="card-text font-weight-bold">12$/h · <span className="texto-dis">2,1 km de mi</span></p>
                        </div>
                    </div>
                    <div className="card card-mod sin-auth">
                        <img className="card-img-top" src={require("../assets/img/imagen-card2.jpg")} alt="card cap"></img>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">Deporte</h6>
                            <p className="card-text font-weight-bold">12$/h · <span className="texto-dis">2,1 km de mi</span></p>
                        </div>
                    </div>
                    
                    <div className="card card-mod sin-auth">
                        <img className="card-img-top" src={require("../assets/img/imagen-card3.jpg")} alt="card cap"></img>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">Deporte</h6>
                            <p className="card-text font-weight-bold">12$/h · <span className="texto-dis">2,1 km de mi</span></p>
                        </div>
                    </div>
                    <div className="button buton-regi">
                        <button className="boton">Registrarme</button>
                    </div>
                </div>
                  
            )    
        }
        
    }

    render(){
        return(
            <div className="container">
                {this.generador()}
            </div>
        );
    }
}

export default Content;