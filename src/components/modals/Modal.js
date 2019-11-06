import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import { logout } from '../functions/logout'
import axios from 'axios'

import '../styles/Modal.css';

class Modal extends Component{

    constructor(props){
        super(props)
        this.state = {
            user_id: "",
            showButton: false,
            currentSelect: ""
        }
    }
    
    componentDidMount = () =>{
        this.setState({
            user_id: this.props.userId
        })
    }

    handleEnableButton = (e) =>{
        this.setState({
            showButton: true,
            currentSelect: e.target.tabIndex
        })
    }

    handleDisablebutton = () =>{
        this.setState({
            showButton: false
        })
    }

    handleButtonAction = (e) =>{
        if(this.state.currentSelect == 1){
            logout()
        }else if(this.state.currentSelect == 2){
            const valid = this.deleteCurrentUser()
            if(valid){
                logout()
            }
        }
    }

    deleteCurrentUser = async () => {     
        const user_id = this.state.user_id
        try {
            await axios 
            .post("/deleteUser", {user_id})
            .then(res => {
                console.log(res)
                if (res.data.response) {                    
                    console.log("Se ha eliminado la cuenta")
                    return true
                } else {
                    console("Error")
                    return false
                }
            })
        } catch (error) {
            console.log(error)
            return false
        }   
        return true
    }

    render(){
        return (
            <div className="tamaño-window">
                <div className="modal-wrapper"
                    // onClick={this.handleDisablebutton}
                    style={{
                        transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>

                    <div className="modal-header" onClick={this.handleDisablebutton}>
                        <h3>Opciones</h3>
                        <span className="close-modal-btn" onClick={this.props.close}>×</span>
                    </div>
                    <div className="modal-body">
                        <div tabIndex="1" onClick={this.handleEnableButton} className="eleccion eli">Cerrar Sesión</div>
                        <div tabIndex="2" onClick={this.handleEnableButton} className="eleccion eli">Eliminar mi cuenta permanentemente</div>
                        <div 
                            className="div-green-colo" 
                            onClick={this.handleDisablebutton}
                            style={isMobile ? {height: "26vh"} : {height: "22vh"}}    
                        />
                    </div>

                    <form onSubmit={this.handleButtonAction}>
                        {(this.state.showButton == true) ? <button type="submit" className="btn-confirmar-modal">Confirmar</button>: null}
                    </form>
                    
                </div>
            </div>
        )
    }
}

export default Modal;