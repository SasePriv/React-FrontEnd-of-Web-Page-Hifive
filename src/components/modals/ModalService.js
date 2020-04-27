import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import '../styles/Modal.css';

class ModalService extends Component{

    constructor(props){
        super(props)
        this.state = {
            showButton: false,
            currentSelect: "",
            redirect: false,
            error: ""
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

    handleActiServi = async () =>{

        const service_id = this.props.serviceId
    
        try{
          axios
          .post('/servicesStatusChange', { service_id })
          .then(res => {
            if(res.data.response){
                this.setState({
                    redirect: true
                })
            //   this.fetchInfoServices()
            }else{
              this.setState({
                error: res.message
              })
            }
          })
        }catch(error){
          console.log(error)
        }
      }

    handleButtonAction = async () =>{
        if(this.state.currentSelect == 1){
            this.handleActiServi()
            this.setState({
                redirect: true
            })
        }else{
            try{
                await axios
                .post(`/removedServices/${this.props.serviceId}`)
                .then(res => {
                    if (res.data.response) {
                        console.log("eliminado")
                    }
                })
            }catch(error){
                const service_id = this.props.serviceId
                try{
                    if (this.props.status) {
                        axios
                        .post('/servicesStatusChange', { service_id })
                        .then(res => {
                          if(res.data.response){
                            this.setState({
                              sucesMessage: res.data.message
                            })
                            this.fetchInfoServices()
                          }else{
                            this.setState({
                              error: res.message
                            })
                          }
                        }) 
                    }else{
                        alert("El servicio ya fue desactivado")
                    }                    
                }catch(error){
                    console.log(error)
                }
            }
            this.setState({
                redirect: true
            })
        }
    }

    render(){

        if (this.state.redirect) {
            return (<Redirect to={{
                pathname: "/myprofile/",
                state: {status: Math.random()}
            }} />)
        }

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

export default ModalService;