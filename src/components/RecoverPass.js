/* eslint-disable eqeqeq */
import React, {Component} from 'react';
import axios from 'axios'
import {Redirect } from 'react-router-dom'
import './styles/register.css'
import './styles/Login.css'
import './styles/RecoverPass.css'
import loginImg from '../assets/svg/logo_vec.svg';
import emailImg from '../assets/svg/email-icon.svg'


class RecoverPass extends Component{
    constructor(){
        super();
        this.state = {
            redirect: false,
            form: {
                email: ""
            },
            error_mess: "",
            response_mess: ""
        }
    }


    UNSAFE_componentWillMount = () =>{
        if (sessionStorage.getItem("userData")) {
            this.setState({
                redirect: true
            })
        }
    }

    handleSubmit = async (e) =>{
        e.preventDefault()
        
        const email = this.state.form.email

        try {
            await axios
            .post('/forgotPassword', {email})
            .then(res => {
                console.log(res.data)
                if(res.data.response){
                    this.setState({
                        response_mess: res.data.message
                    })
                }else{
                    this.setState({
                        error_mess: res.data.message
                    })
                }
            })
        } catch (error) {
            console.log("error")
        }        
    }

    handleError = () => {
        if (this.state.error_mess == "Email id not found") {
            return(
                <div className="error-message mb-2">Email no registrado</div>
            )
        }else if(this.state.response_mess == "Email sent to your id"){
            return(<div className="error-message color-good mb-2">Se ha enviado el correo de recuperacion,<br></br> por favor revise su correo</div>)
        }else if(this.state.error_mess != ""){
            return(<div className="error-message mb-2">Ha ocurrido un error</div>)
        }
    }

    handleChange = (e) =>{
        e.preventDefault();
        this.setState({
            form:{
                [e.target.name] : e.target.value
            }
        })
    }
    
    render(){ 
        if (this.state.redirect) {
            return (<Redirect to="/" />)
        }
        return(
            <div className="d-flex justify-content-center p-out">
                <div className="flex-column">
                    <div className="p-2 centrar-text centrar texto-desing" id="titulo-header">Restablecer contraseña</div>
                    <div className="p-2">                    
                     <img className="centrar" alt="logo" id="imagen-logo" src={loginImg}></img>
                    </div>
                   <form onSubmit={this.handleSubmit} className="p-2 customCheckbox">
                        <div className="form-group">    
                            <fieldset id="contra" className="border scheduler-border ancho">
                                <input onChange={this.handleChange} name="email" value={this.state.form.email} className="texto-desing mar-t" type="email" id="email" placeholder="Email"></input>
                                <img className="icon-input recover-input" alt="iconinput" src={emailImg}></img>
                            </fieldset>
                        </div>
                        {this.handleError()}
                        <div className="texto-desing" id="texto-informativo">
                            Te enviaremos un email con un enlace<br></br>
                            desde el que podrás establecer una <br></br>
                            nueva contraseña
                        </div>
                        <div className="form-group">
                            <div className="button buton-enviar">
                                <button className="boton-enviar">Enviar</button>
                            </div>
                        </div>
                   </form>     
                </div>
            </div>
        )
    }
}

export default RecoverPass;