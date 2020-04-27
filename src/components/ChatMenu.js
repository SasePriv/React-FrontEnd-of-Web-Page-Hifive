import React, {Component} from 'react';
import Bar from './Bar';
import { chatDatos } from '../assets/chat_list.json'
import {Redirect, Link} from 'react-router-dom'
import { Tabs, Tab } from 'react-bootstrap';
import axios from 'axios'
import '../components/styles/chat-menu.css'
import nochat from '../assets/svg/chat.svg'

class ChatMenu extends Component{
    constructor(){
        super();
        this.state = {
            user_id: "",
            chatDatos: chatDatos,
            chatPro: null,
            chatCus: null,
            redirect: false,
            url: "https://hifive.es/hifive-rest-api/public/userProfileImages/"
        }
    }

    UNSAFE_componentWillMount = () =>{
        if (!sessionStorage.getItem("userData")) {
            this.setState({
                redirect: true
            })
        }else{
            const idUser = JSON.parse(sessionStorage.getItem('userData'))
            this.setState({
                user_id: idUser.id
            })
        }
    }

    componentDidMount = () =>{
        this.fetchAllChat("professional")
        this.fetchAllChat("customer")
    }

    fetchAllChat = async (type) => {
        let formData = new FormData()
        formData.append("type", type)
        formData.append("user_id", this.state.user_id)

        try {
            await axios
            .post("/get_chats", formData)
            .then(res => {
                console.log(res.data.data)
                if (res) {
                    if (type == "professional") {
                        this.setState({
                            chatPro: res.data.data
                        })
                    }else{
                        this.setState({
                            chatCus: res.data.data
                        })
                    }
                }else if(res.data.response == "No Chat Data Found"){
                    console.log("No chats")
                }else{
                    console.log("error")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    notificaion_icon(datos1){
        if(false){
            return(<div className="notifi">{datos1.ncant}</div>)
        }else{
            return(<div className="texto-tiempo"><span>{datos1.chatUserService?.price}</span>$/h</div>)
        }
    }

    render(){

        console.log(this.state)

        if (this.state.redirect) {
            return (<Redirect to="/" />)
        }

        return(
            <div className="d-flex justify-content-center">
                <div className="flex-column espacio">
                    <div className="p-2 texto-titulo-chat">Chat</div>
                    <div className="p-2">
                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="Clientes">
                        {this.state.chatCus != null ? this.state.chatCus.map( (eachChat, index) => {
                                console.log(eachChat)
                                return(
                                    <div className="mt-1 cada-chat" key={index}>  
                                        <Link 
                                            to={{
                                                pathname:  `/chat/${eachChat.room_id}`, 
                                                state:{
                                                    name: eachChat.userDataa.name,
                                                    imageUrl: this.state.url+eachChat.userDataa?.userProfileImage.profile_image,
                                                    to_user_id: eachChat.to_user_id,
                                                    serviceId: eachChat.service_id
                                                }                                                
                                            }}>
                                            <div className="p-2">
                                                <div className="d-flex each-chat">
                                                    <div className="foto-chat-perfil">
                                                        <img className="imagen-photo" src={this.state.url+eachChat.userDataa?.userProfileImage.profile_image} />                                                         
                                                    </div>
                                                    <div className="contenido-menu-chat">
                                                        <div className="texto-desing text-menu-title">{eachChat.userDataa.name}</div>
                                                        <div className="texto-desing text-menu-subtitle">{eachChat.chatUserService.title}</div>
                                                    </div>
                                                    <div className="tiempo-menu-chat tiempo-chat">
                                                        <div className="texto-tiempo">22:16</div>
                                                        {this.notificaion_icon(eachChat)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <div className="line"></div>
                                            </div>
                                        </Link>                                      
                                    </div>    
                                )
                            })
                            :
                            <div className="d-flex justify-content-center no-chats">
                                <div className="content-nchat">
                                    <img alt="no-chats" src={nochat} ></img>
                                    <div className="text-menu-title">Aquí aparecerán tus conversaciones con los profesionales</div>
                                </div>
                            </div>
                            }
                        </Tab>
                        <Tab eventKey="profile" title="Profesionales">
                            {this.state.chatPro != null ? this.state.chatPro.map( (eachChat, index) => {
                                console.log("ser: "+eachChat.service_id)
                                return(
                                    <div className="mt-1 cada-chat" key={index}>  
                                        <Link 
                                            to={{
                                                pathname:  `/chat/${eachChat.room_id}`, 
                                                state:{
                                                    name: eachChat.userDataa.name,
                                                    imageUrl: this.state.url+eachChat.userDataa?.userProfileImage.profile_image,
                                                    to_user_id: eachChat.to_user_id ,
                                                    serviceId: eachChat.service_id
                                                }                                                
                                            }}>
                                            <div className="p-2">
                                                <div className="d-flex each-chat">
                                                    <div className="foto-chat-perfil">
                                                        <img className="imagen-photo" src={this.state.url+eachChat.userDataa?.userProfileImage.profile_image} />                                                         
                                                    </div>
                                                    <div className="contenido-menu-chat">
                                                        <div className="texto-desing text-menu-title">{eachChat.userDataa.name}</div>
                                                        <div className="texto-desing text-menu-subtitle">{eachChat.chatUserService.title}</div>
                                                    </div>
                                                    <div className="tiempo-menu-chat tiempo-chat">
                                                        <div className="texto-tiempo">22:16</div>
                                                        {this.notificaion_icon(eachChat)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <div className="line"></div>
                                            </div>
                                        </Link>                                      
                                    </div>    
                                )
                            })
                            :
                            <div className="d-flex justify-content-center no-chats">
                                <div className="content-nchat">
                                    <img alt="no-chats" src={nochat} ></img>
                                    <div className="text-menu-title">Aquí aparecerán tus conversaciones con los profesionales</div>
                                </div>
                            </div>
                            }
                        </Tab>
                    </Tabs>
                    </div>
                </div>
                <Bar></Bar>
            </div>
        )
    }

}

export default ChatMenu;