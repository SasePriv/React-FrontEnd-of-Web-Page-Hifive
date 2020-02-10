import React, {Component} from 'react';
import './styles/register.css'
import './styles/Login.css'
import './styles/RecoverPass.css'
import loginImg from '../assets/svg/logo_vec.svg';
import passImg from '../assets/svg/pass.svg'


class RecoveringPassword extends Component{
    constructor(){
        super();
    }

    

    render(){ 
        return(
            <div className="d-flex justify-content-center p-out">
                <div className="flex-column">
                    <div className="p-2 centrar-text centrar texto-desing" id="titulo-header">Restablecer contraseña</div>
                    <div className="p-2">                    
                     <img className="centrar" id="imagen-logo" src={loginImg}></img>
                    </div>
                   <form action="#"className="p-2 customCheckbox">
                        <div className="form-group">    
                            <fieldset id="contra" className="border scheduler-border ancho">
                                <input className="texto-desing mar-t" type="password" id="pass" placeholder="Nueva contraseña"></input>
                                <img className="icon-input recover-input"src={passImg}></img>
                            </fieldset>
                        </div>
                        <div className="form-group">
                            <div className="button buton-enviar">
                                <button className="boton-enviar">Guardar</button>
                            </div>
                        </div>
                   </form>     
                </div>
            </div>
        )
    }
}

export default RecoveringPassword;