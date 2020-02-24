import React, {Component} from 'react';
import '../components/styles/chat.css'
import flecha from '../assets/svg/flechaVector.svg'
import TextareaAutosize from 'react-textarea-autosize';

class Chat extends Component{
    constructor(props){
        super(props);
        this.textarea1 = React.createRef();
        this.state = {
            opcion: "",
        };
    }


    render(){

                    
        return(
            <div className="d-flex " >
                <div className="flex-column top-chat ">
                    <div className="p-2 arriba" > 
                        <div className="d-flex ejemplo">
                            <img className="" src={flecha}></img>
                            <img id="imagen-current-chat" src={require("../assets/img/imagen-card1.jpg")}></img>
                            <div className="texto-desing texto-chat-current">Sara Lacour</div>
                        </div>
                    </div>
                    <div className="p-2 box-chat prueba"  >
                        <div className="d-flex flex-row mt-3">
                            <div className="p-2 texto-2 texto-chat-box">Lorem ipsum dolor sit amet sit amet sit amet sit amet</div>
                        </div>
                        <div className="d-flex flex-row-reverse mt-3 ">
                            <div className="p-2 texto-2 texto-azul texto-chat-box">Lorem ipsum dolor sit amet sit amet sit amet</div>
                        </div>                        
                    </div>
                    <div className="input-text-box d-flex">
                        <TextareaAutosize id="inp" row='1' id="entrada-chat" placeholder="Escriba" className="input-entrada p-2"></TextareaAutosize>                   
                        <div className="btn-accion p-2">
                            <img alt="icono-evento" src={require('../assets/img/icon/icon-event.png')}></img>
                            {/* <img alt="icono-evento" className="icon-envio" src={require('../assets/img/icon/enviar-chat.png')}></img> */}
                        </div>
                    </div>
                </div>
            </div>
            // style={{height: tamaño+"px"}}
        )
    }

}

export default Chat;