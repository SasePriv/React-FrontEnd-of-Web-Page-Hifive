/* eslint-disable eqeqeq */
import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom'
import axios from 'axios'
import './styles/register.css'
import './styles/Login.css'
import './styles/RecoverPass.css'
import loginImg from '../assets/svg/logo_vec.svg';
import passImg from '../assets/svg/pass.svg'


class RecoveringPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            password: "",
            passError: "",
            token: "",
            status: false
        }
    }

    UNSAFE_componentWillMount = () =>{
        console.log(this.props.match.params.token)

        if (sessionStorage.getItem("userData")) {
            this.setState({
                redirect: true
            })
        }

        if (this.props.match.params.token) {
            this.setState({
                token: this.props.match.params.token
            })
        }else{
            this.setState({
                redirect: true
            })
        }
    }

    handleChange = (e) =>{
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) =>{
        e.preventDefault()
        
        let formData = new FormData()
        formData.append("token",this.state.token)
        formData.append("password", this.state.password)

        let isValidate = this.validate()
        if (isValidate) {
            try {
                await axios
                .post("/changePassword", formData)
                .then(res => {
                    if (res.data.response) {
                        this.setState({
                            status: true
                        })
                    }else{
                        console.log("Error Server")
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    validate = () =>{        
        let password = this.state.password   
        let re             

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

        if (password.length < 8) {
            this.setState({
                passError: "La contraseña debe tener al menos 8 caracteres"
            })
            return false
        } else {
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
                passError: "La contraseña debe tener al menos una letra en minuscula"
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

        return true;

    }

    

    render(){ 

        if (this.state.redirect) {
            return (<Redirect to="/" />)
        }

        return(
            <div className="d-flex justify-content-center p-out">
                <div className="flex-column">
                    <div className="p-2 centrar-text centrar texto-desing" id="titulo-header">Restablecer contraseña</div>
                    <Link to="/">
                        <div className="p-2">                    
                        <img className="centrar" alt="login" id="imagen-logo" src={loginImg}></img>
                        </div>
                    </Link>
                   <form onSubmit={this.handleSubmit} className="p-2 customCheckbox" style={this.state.status ? {display: "none"} : null}>
                        <div className="form-group">    
                            <fieldset id="contra" className="border scheduler-border ancho">
                                <input onChange={this.handleChange} className="texto-desing mar-t" value={this.state.password} name="password" type="password" id="pass" placeholder="Nueva contraseña"></input>
                                <img className="icon-input recover-input" alt="passwordIcon" src={passImg}></img>
                            </fieldset>
                            <div className="error-message mb-2">{this.state.passError}</div>
                        </div>
                        <div className="form-group">
                            <div className="button buton-enviar">
                                <button className="boton-enviar">Guardar</button>
                            </div>
                        </div>
                   </form>     
                   <div className="texto-desing" id="texto-informativo" style={this.state.status ? {display: "unset"} : {display: "none"}}>
                        Su contraseña se ha cambiado con exito
                    </div>
                </div>
            </div>
        )
    }
}

export default RecoveringPassword;