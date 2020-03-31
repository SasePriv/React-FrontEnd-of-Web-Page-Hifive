import React, {Component} from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import './styles/register.css'
import './styles/Login.css'
import loginImg from '../assets/svg/logo_vec.svg';
import emailImg from '../assets/svg/email-icon.svg'
import passImg from '../assets/svg/pass.svg'

class Login extends Component{
    constructor(){
        super();
        this.state = {
            opcion: true,
            form: {
                primary_key_type: 'email',
                email: '',
                password: ''                
            },            
            loggedIn: false,
            error_code: '',
            redirect: false
        }
    }

    componentWillMount = () =>{
        if (sessionStorage.getItem("userData")) {
            this.setState({
                redirect: true
            })
        }
    }

    onChange = (e) =>{
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value 
            }
        })

        
    }

    handlesubmit = async (e) =>{
        e.preventDefault();
        this.setState({
            error_code: ""
        })

        const primary_key_type = this.state.form.primary_key_type
        const email = this.state.form.email
        const password = this.state.form.password

        axios
        .post('/login', {primary_key_type, email, password})
        .then(res => {
            if (res.data.response) {
                sessionStorage.setItem('userData', JSON.stringify(res.data.data))
                this.setState({
                    redirect: true
                })
            }else{
                this.setState({
                    error_code: res.data.status
                })
            }
        })
    }

    handleError = (codigo, mess, place) => {
        if (place == 1) {
            if (codigo == this.state.error_code) {
                return(
                    <div className="error-message">{mess}</div>
                )
            }else if (this.state.error_code == 4) {
                if(this.state.form.email != ""){
                    if (codigo == 2) {
                        return(
                            <div className="error-message">Por favor ingrese la contraseña</div>
                        )
                    }                    
                }else if (this.state.form.password != ""){
                    if(codigo == 3){
                        return(
                            <div className="error-message">Por favor ingrese el correo</div>
                        )
                    }                    
                }else{
                    return(
                        <div className="error-message">Por favor ingrese email y contraseña</div>
                    )
                }
            }
        } else {
            if (codigo == this.state.error_code) {
                return("error-border")
                
            }else if (this.state.error_code == 4) {
                if(this.state.form.email != ""){
                    if (codigo == 2) {
                        return("error-border")
                    }                    
                }else if (this.state.form.password != ""){
                    if(codigo == 3){
                        return("error-border")
                    }                    
                }else{
                    return("error-border")
                }
                
            }
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
                        <fieldset className={"border scheduler-border "+ this.handleError(3,"", 0)}>
                            <legend className="w-auto texto-desing">Email</legend>
                            <input className="texto-desing" type="email" id="email" name="email" placeholder="Correo" value={this.state.form.email} onChange={this.onChange}></input>
                            <img className="icon-input"src={emailImg}></img>
                        </fieldset>
                        {this.handleError(3, "Email Incorrecto", 1)}
                    </div>
                    <div className="form-group">
                        <fieldset id="contra" className={"border scheduler-border "+ this.handleError(2,"", 0)}>
                            <input className="texto-desing mar-t" type="password" id="pass" name="password" placeholder="Contraseña"  value={this.state.form.password} onChange={this.onChange}></input>
                            <img className="icon-input mar-t" id="icon-pass" src={passImg}></img>
                        </fieldset>
                        {this.handleError(2, "Contraseña Incorrecta", 1)}
                    </div>
                    <div className="texto-desing texto-inicio ancho"><a href="#">¿Has olvidado la contraseña? Recupérala</a></div>
                    <div className="texto-desing texto-inicio" id="inicio2"><a href="#">¿No tienes cuenta? Registrate</a></div>
                    <div className="form-group">
                        <button type="submit" id="btn-submit" className="btn btn-desing texto-desing">Iniciar sesión</button>
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
        if (this.state.redirect) {
            return (<Redirect to="/home" />)
        }
        return(
            <div className="d-flex justify-content-center p-out">
                <div className="flex-column">
                    <div className="p-2 centrar-text centrar texto-desing" id="titulo-header">Iniciar sesión</div>
                    <div className="p-2">                    
                     <img className="centrar" id="imagen-logo" src={loginImg}></img>
                    </div>
                   <form className="p-2 customCheckbox" onSubmit={this.handlesubmit}>
                        <div className="form-group">    
                            <button className="desing buton-centro" style={{border: '1px solid #000'}}><img src={require("../assets/img/google-icon.png")}></img><p>Continuar con Google</p></button>
                        </div>
                        <div className="form-group tocar">
                            <div className="desing buton-centro" style={this.handleEmailStyle()} onClick={(x) => this.changeBoolean(x)}><img id="email-icon" style={this.handleEmailStyleImg()} src={emailImg}></img><p>Continuar con Email</p></div>
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