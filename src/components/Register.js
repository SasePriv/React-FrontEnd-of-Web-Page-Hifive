import React, {Component} from 'react';
import './styles/register.css'
import loginImg from '../assets/svg/logo_vec.svg';
import emailImg from '../assets/svg/email-icon.svg'
import passImg from '../assets/svg/pass.svg'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

class Register extends Component{
    constructor(){
        super();
        this.state = {
            opcion: true,
            form: {
                email: "",
                password: "",
                checkBox: false
            },
            emailError: "",
            passError: "",
            checkError: "",
            redirect: false,
            redirectSubmit: false,
            error_code: "",
            error: "",                        
        }
        this.handleSubmit = this.handleSubmit.bind(this)
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
            const isValid = this.validate()  
            if (isValid) {
                const email = this.state.form.email
                const password = this.state.form.password
                try {
                    await axios
                    .post('/checkEmail', {email})
                    .then(res => {
                        if (!res.data.response) {                    
                            this.setState({
                                redirectSubmit: true
                            })
                        }else{
                            this.setState({
                                emailError: "El correo introducido ya esta en uso"
                            })
                        }
                    })
                } catch (error) {
                    console.log(error)
                } 
            }                                                                     
    }

    validate = () =>{
        let email = this.state.form.email
        let password = this.state.form.password
        let check = this.state.form.checkBox
        let re = ""


        if (email == "") {
            this.setState({
                emailError: "No puede estar vacio"
            })
            return false
        }else{
            this.setState({
                emailError: ""
            })
        }

        re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!re.test(email)) {
            this.setState({
                emailError: "Por favor introduce un correo valido"
            })
            return false
        }else{
            this.setState({
                emailError: ""
            })
        }

        if (password == "") {
            this.setState({
                passError: "No puede dejar este campo vacio"
            })
            return false
        }else{
            this.setState({
                passError: ""
            })
        }

        if(password == email){
            this.setState({
                passError: "No puede ser igual al correo"
            })
            return false
        }else{
            this.setState({
                passError: ""
            })
        }

        re = /[0-9]/;
        if(!re.test(password)){
            this.setState({
                passError: "La contraseña debe tener al menos un numero 0-9"
            })
            return false
        }else{
            this.setState({
                passError: ""
            })
        }

        re = /[a-z]/;
        if(!re.test(password)){
            this.setState({
                passError: "La contraseña debe tener al menos una letre en minuscula"
            })
            return false
        }else{
            this.setState({
                passError: ""
            })
        }

        re = /[A-Z]/;
        if (!re.test(password)) {
            this.setState({
                passError: "La contraseña debe tener al menos una letra en mayuscula"
            })
            return false
        }else{
            this.setState({
                passError: ""
            })
        }

        if(!check){
            this.setState({
                checkError: "Por favor acepte los terminos y condiciones"
            })
            return false
        }else{
            this.setState({
                checkError: ""
            })
        }

        return true;

    }

    changeBoolean(){
        if (this.state.opcion) {
            this.setState({
                opcion: false,
                submitOption: false
            })
        }else{
            this.setState({
                opcion: true
            })
        }
    }

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value 
            }
        })
    }

    handleChangeCheck = (e) =>{
        e.preventDefault()
        this.setState({ 
            form:{
                ...this.state.form,
                [e.target.name]: e.target.checked    
            }                    
        })        
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

    handleEmail(){
        if (!this.state.opcion) {
            return(
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <fieldset className="border scheduler-border">
                            <legend className="w-auto texto-desing">Email</legend>
                            <input onChange={this.handleChange} name="email" value={this.state.form.email} className="texto-desing" id="email" placeholder="Correo" />
                            <img className="icon-input"src={emailImg}></img>
                        </fieldset>
                    </div>
                    <div className="error-message mb-2">{this.state.emailError}</div>
                    <div className="form-group">
                        <fieldset id="contra" className="border scheduler-border">
                            <input onChange={this.handleChange} name="password" value={this.state.form.password} className="texto-desing mar-t" type="password" id="pass" placeholder="Contraseña"></input>
                            <img className="icon-input mar-t" id="icon-pass" src={passImg}></img>
                        </fieldset>
                    </div>
                    <div className="error-message mb-2">{this.state.passError}</div>
                    <div className="form-check p-out pa-right">
                        <input onChange={this.handleChangeCheck} checked={this.state.form.checkBox} name="checkBox" type="checkbox" className="desing-check" id="checkbox1"></input>
                        <label className="texto-desing" id="terminos" htmlFor="checkbox1">Acepto los <span>términos y condiciones</span> y la <span>politica de privacidad</span></label>
                    </div>  
                    <div className="error-message mb-2">{this.state.checkError}</div>
                    <Link to="/login">
                        <div className="texto-desing texto-inicio" id="inicio2"><a href="#">¿Ya tienes cuenta? Inicia sesión</a></div>
                    </Link>
                    <div className="form-group">
                        <button type="submit" id="btn-submit" className="btn btn-desing texto-desing">Registrarme</button>
                    </div>
                </form>
            )
        }
    }

    handleInfo(){
        if (this.state.opcion) {
            return (
                <div>
                    <div className="form-check p-out pa-right">
                            <input type="checkbox" className="desing-check" id="checkbox1"></input>
                            <label className="texto-desing" id="terminos" for="checkbox1">Acepto los <span>términos y condiciones</span> y la <span>politica de privacidad</span></label>
                    </div>
                    <Link to="/login">
                        <div className="texto-desing texto-inicio"><a href="#">¿Ya tienes cuenta? Inicia sesión</a></div>
                    </Link>
                </div>
            )
        }
    }

    render(){ 

        if (this.state.redirect) {
            return (<Redirect to="/" />)
        }

        if (this.state.redirectSubmit){
            return (<Redirect to={{
                pathname: "/mypersonalinfo",
                state: this.state.form
            }} />)
        }

        return(
            <div className="d-flex justify-content-center p-out">
                <div className="flex-column">
                    <div className="p-2 centrar-text centrar texto-desing" id="titulo-header">Crear Cuenta</div>
                    <div className="p-2">                    
                     <img className="centrar" id="imagen-logo" src={loginImg}></img>
                    </div>
                   <div className="p-2 customCheckbox">
                        <div className="form-group">    
                            <button className="desing buton-centro" style={{border: '1px solid #000'}}><img src={require("../assets/img/google-icon.png")}></img><p>Continuar con Google</p></button>
                        </div>
                        <div className="form-group">
                            <button className="desing buton-centro" style={this.handleEmailStyle()} onClick={(x) => this.changeBoolean(x)}><img id="email-icon" style={this.handleEmailStyleImg()} src={emailImg}></img><p>Continuar con Email</p></button>
                        </div>
                        {this.handleEmail()}
                        {this.handleInfo()}
                   </div>     
                </div>
            </div>
        )
    }
}

export default Register;