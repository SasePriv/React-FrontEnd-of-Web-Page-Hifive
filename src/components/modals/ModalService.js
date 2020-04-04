import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';

import '../styles/Modal.css';

class Modal extends Component{

    constructor(props){
        super(props)
        this.state = {
            showButton: false,
            currentSelect: ""
        }
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

    handleButtonAction = () =>{
        if(this.state.currentSelect == 1){
            console.log("Desactivar")
        }else{
            console.log("eliminacion")
        }
    }

    render(){
        return (
            <div>
                <div className="modal-wrapper"
                    // onClick={this.handleDisablebutton}
                    style={{
                        transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                        position: "fixed",
                        bottom: 0
                    }}>

                    <div className="modal-header" onClick={this.handleDisablebutton}>
                        <h3>Opciones</h3>
                        <span className="close-modal-btn" onClick={this.props.close}>×</span>
                    </div>
                    <div className="modal-body">
                        <div tabIndex="1" onClick={this.handleEnableButton} className="eleccion eli">Desactivar servicio temporalmente</div>
                        <div tabIndex="2" onClick={this.handleEnableButton} className="eleccion eli">Eliminar servicio permanentemente</div>
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