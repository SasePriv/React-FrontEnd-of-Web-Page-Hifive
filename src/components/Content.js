import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './styles/Content.css'

import { home } from '../assets/datos_prueba.json'

class Content extends Component{
    constructor(props){
        super(props);
        this.state = {
            home,
            auth: props.auth
        };
    }
    
    generador(data){
        if (this.state.auth) {
            return (
                <div className="d-flex justify-content-center flex-wrap">
                    {data.map( (currentData) => {
                        return(
                            <div className="card card-mod" key={currentData.id}>
                                <Link to={{
                                    pathname: "/viewService/" + currentData.id,
                                    state: {currentData}
                                }}>
                                    <input type="hidden" id="serviceID" name="serviceID" value={currentData.id} />
                                    <input type="hidden" id="userID" name="userID" value={currentData.user_id} />
                                    <img className="card-img-top" alt={currentData.alt} src={require("../assets/img/imagen-card1.jpg")}></img>
                                    <div className="card-body card-mod-text">
                                        <h6 className="card-text mt-1 font-weight-bold">{currentData.title}</h6>
                                        <p className="card-text font-weight-bold">{currentData.price}$/h · <span className="texto-dis">25 km de mi</span></p>
                                    </div>
                                </Link>
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
                        <Link to="/signup">
                            <button className="boton">Registrarme</button>
                        </Link>
                    </div>
                </div>
                  
            )    
        }
        
    }

    render(){
        const {data} = this.props

        return(
            <div className="container">
                {this.generador(data)}
            </div>
        );
    }
}

export default Content;