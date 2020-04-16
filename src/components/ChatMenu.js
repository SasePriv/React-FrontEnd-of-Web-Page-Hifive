import React, {Component} from 'react';
import Bar from './Bar';
import { chatDatos } from '../assets/chat_list.json'
import '../components/styles/chat-menu.css'

class ChatMenu extends Component{
    constructor(){
        super();
        this.state = {
            chatDatos,

        }
    }

    notificaion_icon(datos1){
        if(datos1.notificacion){
            return(<div className="notifi">{datos1.ncant}</div>)
        }else{
            return(<div className="texto-tiempo"><span>{datos1.precio}</span>$/h</div>)
        }
    }

    render(){

        return(
            <div className="d-flex justify-content-center">
                <div className="flex-column espacio">
                    <div className="p-2 texto-titulo-chat">Chat</div>
                    <div className="p-2">
                        
                    </div>
                    {this.state.chatDatos.map( (e) => {
                        return(
                            <div>
                                <div className="p-2">
                                    <div className="d-flex each-chat">
                                        <div className="foto-chat-perfil">
                                            <img className="imagen-photo" src={require("../assets/img/"+e.path_image)} >     
                                            </img>
                                        </div>
                                        <div className="contenido-menu-chat">
                                            <div className="texto-desing text-menu-title">{e.name}</div>
                                            <div className="texto-desing text-menu-subtitle">{e.cargo}</div>
                                        </div>
                                        <div className="tiempo-menu-chat tiempo-chat">
                                            <div className="texto-tiempo">22:16</div>
                                            {this.notificaion_icon(e)}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <div className="line"></div>
                                </div>
                            </div>    
                        )
                    })}
                </div>
                <Bar></Bar>
            </div>
        )
    }

}

export default ChatMenu;