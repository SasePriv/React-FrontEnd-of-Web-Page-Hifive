/* eslint-disable eqeqeq */
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import './styles/register.css'
import './styles/Login.css'
import './styles/RecoverPass.css'
import './styles/Mypersonalinfo.css'
import loginImg from '../assets/svg/logo_vec.svg';
import fotoPerfil from '../assets/svg/foto-perfil.svg'
import usuarioImg from '../assets/svg/person.svg'
import torta from '../assets/svg/torta.svg'
import axios from 'axios'


class Mypersonalinfo extends Component{
    constructor(props){
        super(props);
        this.state = {            
            redirect: false,
            form:{
                email: "",
                password: "",        
                date_birth: "",
                name: "",
                primary_key_type: "" ,
                file: null,
                file_url: null,       
            },
            nameError: "",
            fileError: "",
            dateError: "",
            error: ""
        }
    }

    UNSAFE_componentWillMount = () =>{
        if (sessionStorage.getItem("userData")) {
            this.setState({
                redirect: true
            })
        }
    }

    componentDidMount = () =>{
        this.setState({
            form:{
                email: this.props.location.state.email,
                password: this.props.location.state.password,
                primary_key_type: "email"
            }
        })
    }

    handleChangeInput = (e) =>{
        if (e.target.files[0]) {
            this.setState({
                form: {
                    ...this.state.form,
                    file_url: URL.createObjectURL(e.target.files[0]),
                    file: e.target.files[0]    
                }                
            })
        }
    }    


    handleChange = (e) =>{
        e.preventDefault();
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(e.target.name+" : "+e.target.value)
    }

    handleSubmit = async (e) =>{
        e.preventDefault()
        const email = this.state.form.email
        const password = this.state.form.password
        const name = this.state.form.name
        const date_birth = this.state.form.date_birth
        const file = this.state.form.file
        const primary_key_type = this.state.form.primary_key_type

        const formData = new FormData()

        formData.append("profile_image", file)
        formData.append("email",email)
        formData.append("name",name)
        formData.append("password",password)
        formData.append("primary_key_type", primary_key_type)

        let user_id = ""

        try {
            const valid = this.validate()
            if (valid) {
                await axios
                .post('/addUser', formData, {
                    headers: {'content-type': 'multipart/form-data'}
                })
                .then(res => {
                    if (res.data.response){                        
                        this.setState({
                            redirect: true
                        })
                        user_id = res.data.data.id  
                        this.handleBirthDay(user_id, date_birth)                             
                    }else{
                        this.setState({
                            error: res.data.status
                        })
                    }                   
                })   
            }                       
        } catch (error) {
            console.log("error")
            console.log(error)
        }        
    }

    handleBirthDay = async (user_id, date_birth) =>{
        try {
            await axios
            .post('/editUser', { user_id, date_birth })
            .then(res => {
              if (res.data.response) {                                     
                  console.log("funciono")                            
              }else{
                this.setState({
                  error: res.message
                })
              }
            })
        }catch (error) {
            console.log(error)
        }
    }

    validate = () =>{
        let name = this.state.form.name
        let file = this.state.form.file
        let birth = this.state.form.date_birth

        if (name == "") {
            this.setState({
                nameError: "No puede estar vacio"
            })
            return false
        }else{
            this.setState({
                nameError: ""
            })
        }

        if (file == null) {
            this.setState({
                fileError: "Por favor suba una imagen"
            })
            return false
        } else {
            this.setState({
                fileError: ""
            })
        }

        if (birth == "")  {
            this.setState({
                dateError: "Por favor introduzca su fecha de nacimiento"
            })
            return false
        } else {
            this.setState({
                dateError: ""
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
                    <div className="p-2 centrar-text centrar texto-desing" id="titulo-header">Mis datos</div>
                    <div className="p-2">                    
                     <img className="centrar" alt="loginImg" id="imagen-logo" src={loginImg}></img>
                    </div>
                   <form onSubmit={this.handleSubmit} className="p-2">
                        <div className="form-group">    
                            <fieldset id="contra" className="border scheduler-border ancho">
                                <input onChange={this.handleChange} value={this.state.form.name} name="name" className="texto-desing mar-t campos" type="text" id="name" placeholder="Nombre y apellidos"></input>
                                <img className="icon-input recover-input" alt="usuario" src={usuarioImg}></img>
                            </fieldset>
                        </div>
                        <div className="error-message mb-2">{this.state.nameError}</div>
                        <div className="form-group">    
                            <fieldset id="contra" className="border scheduler-border ancho custom-file">
                                <div id="texto-file" className="texto-desing">Foto de Perfil</div>
                                <input onChange={this.handleChangeInput} className="texto-desing mar-t campos" type="file"  placeholder="Foto Perfil"></input>
                                <img 
                                    id="photo-perfil" 
                                    className={this.state.form.file != null ? "circule-file icon-input recover-input " : "icon-input recover-input"}
                                    src={this.state.form.file != null ? this.state.form.file_url : fotoPerfil}
                                    alt="perfil"
                                />
                            </fieldset>
                        </div>
                        <div className="error-message mb-2">{this.state.fileError}</div>
                        <div className="form-group">    
                            <fieldset id="contra" className="border scheduler-border ancho">
                                <input onChange={this.handleChange} value={this.state.form.date_birth} name="date_birth" className="texto-desing mar-t campos" type="number" min="1945" max="2019" id="year" placeholder="Año de nacimiento"></input>
                                <img alt="torta" className="icon-input recover-input"src={torta}></img>
                            </fieldset>
                        </div>
                        <div className="error-message mb-2">{this.state.dateError}</div>
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