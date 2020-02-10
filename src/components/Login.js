import React, {Component} from 'react';
import './styles/register.css'
import './styles/Login.css'
import loginImg from '../assets/svg/logo_vec.svg';
import emailImg from '../assets/svg/email-icon.svg'
import passImg from '../assets/svg/pass.svg'

class Login extends Component{
    constructor(){
        super();
        this.state = {
            opcion: true
        }
    }

    changeBoolean(){
        if (this.state.opcion) {
            this.setState({
                opcion: false
            })
        }else{
            this.setState({
                opcion: true
            })
        }
    }

    handleEmail(){

        if (!this.state.opcion) {
            return(
                <div>
                    <div className="form-group">
                        <fieldset className="border scheduler-border">
                            <legend className="w-auto texto-desing">Email</legend>
                            <input className="texto-desing" type="email" id="email" placeholder="Correo"></input>
                            <img className="icon-input"src={emailImg}></img>
                        </fieldset>
                    </div>
                    <div className="form-group">
                        <fieldset id="contra" className="border scheduler-border">
                            <input className="texto-desing mar-t" type="password" id="pass" placeholder="Contraseña"></input>
                            <img className="icon-input mar-t" id="icon-pass" src={passImg}></img>
                        </fieldset>
                    </div>
                    <div className="texto-desing texto-inicio ancho"><a href="#">¿Has olvidado la contraseña? Recupérala</a></div>
                    <div className="texto-desing texto-inicio" id="inicio2"><a href="#">¿No tienes cuenta? Registrate</a></div>
                    <div className="form-group">
                        <button type="submit" id="btn-submit" className="btn btn-desing texto-desing">Iniciar sesión    </button>
                    </div>
                </div>
            )
        }
    }

    handleInfo(){
        if (this.state.opcion) {
            return (
                <div>
                    <div className="texto-desing texto-inicio ancho"><a href="#">¿Has olvidado la contraseña? Recupérala</a></div>
                    <div className="texto-desing texto-inicio"><a href="#">¿No tienes cuenta? Registrate</a></div>
                </div>
            )
        }
    }

    handleEmailStyle(){
        if (!this.state.opcion) {
            return ({border: '0',});
        }else{
            return ({border: '1px solid #000',});
        }
    }

    handleEmailStyleImg(){
        if (!this.state.opcion) {
            return ({display: 'none',});
        }else{
            return ({display: 'flex',});
        }
    }

    render(){ 
        return(
            <div className="d-flex justify-content-center p-out">
                <div className="flex-column">
                    <div className="p-2 centrar-text centrar texto-desing" id="titulo-header">Iniciar sesión</div>
                    <div className="p-2">                    
                     <img className="centrar" id="imagen-logo" src={loginImg}></img>
                    </div>
                   <form action="#"className="p-2 customCheckbox">
                        <div className="form-group">    
                            <button className="desing buton-centro" style={{border: '1px solid #000'}}><img src={require("../assets/img/google-icon.png")}></img><p>Continuar con Google</p></button>
                        </div>
                        <div className="form-group">
                            <button className="desing buton-centro" style={this.handleEmailStyle()} onClick={(x) => this.changeBoolean(x)}><img id="email-icon" style={this.handleEmailStyleImg()} src={emailImg}></img><p>Continuar con Email</p></button>
                        </div>
                        {this.handleEmail()}
                        {this.handleInfo()}
                   </form>     
                </div>
            </div>
        )
    }
}

export default Login;