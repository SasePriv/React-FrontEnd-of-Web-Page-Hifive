import React, {Component} from 'react';
import './styles/register.css'
import './styles/Login.css'
import './styles/RecoverPass.css'
import './styles/Mypersonalinfo.css'
import loginImg from '../assets/svg/logo_vec.svg';
import fotoPerfil from '../assets/svg/foto-perfil.svg'
import usuarioImg from '../assets/svg/person.svg'
import torta from '../assets/svg/torta.svg'


class Mypersonalinfo extends Component{
    constructor(){
        super();
    }

    

    render(){ 
        return(
            <div className="d-flex justify-content-center p-out">
                <div className="flex-column">
                    <div className="p-2 centrar-text centrar texto-desing" id="titulo-header">Mis datos</div>
                    <div className="p-2">                    
                     <img className="centrar" id="imagen-logo" src={loginImg}></img>
                    </div>
                   <form action="#"className="p-2">
                        <div className="form-group">    
                            <fieldset id="contra" className="border scheduler-border ancho">
                                <input className="texto-desing mar-t campos" type="text" id="name" placeholder="Nombre y apellidos"></input>
                                <img className="icon-input recover-input"src={usuarioImg}></img>
                            </fieldset>
                        </div>
                        <div className="form-group">    
                            <fieldset id="contra" className="border scheduler-border ancho custom-file">
                                <div id="texto-file" className="texto-desing">Foto de Perfil</div>
                                <input className="texto-desing mar-t campos" type="file" id="photo-perfil" placeholder="Foto Perfil"></input>
                                <img id="photo-perfil" className="icon-input recover-input"src={fotoPerfil}></img>
                            </fieldset>
                        </div>
                        <div className="form-group">    
                            <fieldset id="contra" className="border scheduler-border ancho">
                                <input className="texto-desing mar-t campos" type="number" min="1945" max="2019" id="year" placeholder="Año de nacimiento"></input>
                                <img className="icon-input recover-input"src={torta}></img>
                            </fieldset>
                        </div>
                        <div className="form-group">
                            <div className="button buton-enviar">
                                <button id="btn-conti" className="boton-enviar btn btn-desing texto-desing">Continuar</button>
                            </div>
                        </div>
                   </form> 
                   <div id="texto-hifive" className="texto-desing">HiFive se basa en la confianza</div>    
                </div>
            </div>
        )
    }
}

export default Mypersonalinfo;