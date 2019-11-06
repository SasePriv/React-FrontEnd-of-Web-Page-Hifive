/* eslint-disable eqeqeq */
import React, {Component} from 'react';
import Bar from './Bar';
import { chatDatos } from '../assets/chat_list.json'
import {Redirect, Link} from 'react-router-dom'
import { Tabs, Tab } from 'react-bootstrap';
import axios from 'axios'
import ImageLoader  from './ImageLoader.js';
import LazyLoad from 'react-lazy-load';
import '../components/styles/chat-menu.css'
import nochat from '../assets/svg/chat.svg'
import smile from '../assets/svg/smile-perfil.svg'

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

    notificaion_icon(eachchat){        
        if(eachchat.unreadchats.length != 0){
            return(<div className="notifi">{eachchat.unreadchats.length}</div>)
        }else{
            return(<div className="texto-tiempo"><span>{eachchat.chatUserService?.price}</span>€/h</div>)
        }
    }

    formatDate = (date) => {
        let d = new Date(date),
            month = d.getMonth() + 1,
            day = '' + d.getDate(),
            year = d.getFullYear();
        
        let acutalDate = new Date()
    
        switch (month) {
            case 1:
                month = "Ene"
                break;
            case 2:
                month = "Feb"
                break;
            case 3:
                month = "Mar"
                break;
            case 4: 
                month = "Abr"
                break;
            case 5:
                month = "May"
                break;
            case 6:
                month = "Jun"
                break;
            case 7:
                month = "Jul"
                break;
            case 8:
                month = "Ago"
                break;
            case 9:
                month = "Sep"
                break;
            case 10:
                month = "Oct"
                break;
            case 11:
                month = "Nov"
                break;
            case 12:
                month = "Dic"
                break;
            default:
                break;
        }

        if (day.length < 2) 
            day = '0' + day;
    
        if (year != acutalDate.getFullYear()) {
            return [day, month, year].join(' ');    
        }else{
            return [month, day].join(' ');    
        }
    }

    formHours = (time) =>{
        let hours = time.getHours()
        let minute = time.getMinutes()

        if (hours < 10) {
            hours = "0" + hours.toString()
        }

        if (minute < 10) {
            minute = "0" + minute.toString()
        }

        return [hours, minute].join(':')
    }

    showTimeChats = (date) =>{
        let lastMessageChat = this.formatDate(date)
        let actualDate = this.formatDate(new Date())
        let time = new Date(date)        
        
        if (lastMessageChat == actualDate) {
            return this.formHours(time)
        }else{
            return lastMessageChat
        }
    }

    render(){
        
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
                                return(
                                    <div className="mt-1 cada-chat" key={index}>  
                                        <Link 
                                            to={{
                                                pathname:  `/chat/${eachChat.room_id}`, 
                                                state:{
                                                    name: eachChat.userDataa.name,
                                                    imageUrl: this.state.url+eachChat.userDataa?.userProfileImage?.profile_image,
                                                    to_user_id: eachChat.to_user_id,
                                                    serviceId: eachChat.service_id
                                                }                                                
                                            }}>
                                            <div className="p-2">
                                                <div className="d-flex each-chat">
                                                    <LazyLoad 
                                                        width={288}
                                                        height={216}
                                                        debounce={false}
                                                        offsetVertical={250}
                                                        
                                                    >
                                                        <div className="foto-chat-perfil">
                                                            {eachChat.userDataa?.userProfileImage 
                                                            ?
                                                                <ImageLoader className="imagen-photo" alt="photo-perfil" src={this.state.url+eachChat.userDataa?.userProfileImage.profile_image} />
                                                            :
                                                                <ImageLoader className="imagen-photo noPhoto" alt="photo-default-perfil" src={smile} />                                                         
                                                            } 
                                                        </div>
                                                    </LazyLoad>
                                                    <div className="contenido-menu-chat">
                                                        <div className="texto-desing text-menu-title">{eachChat.userDataa.name}</div>
                                                        <div className="texto-desing text-menu-subtitle">{eachChat.chatUserService.title}</div>
                                                    </div>
                                                    <div className="tiempo-menu-chat tiempo-chat">
                                                    <div className="texto-tiempo">{this.showTimeChats(eachChat.last_message_time)}</div>
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
                                return(
                                    <div className="mt-1 cada-chat" key={index}>  
                                        <Link 
                                            to={{
                                                pathname:  `/chat/${eachChat.room_id}`, 
                                                state:{
                                                    name: eachChat.userDataa.name,
                                                    imageUrl: this.state.url+eachChat.userDataa?.userProfileImage?.profile_image,
                                                    to_user_id: eachChat.to_user_id ,
                                                    serviceId: eachChat.service_id
                                                }                                                
                                            }}>
                                            <div className="p-2">
                                                <div className="d-flex each-chat">
                                                    <div className="foto-chat-perfil">
                                                        {eachChat.userDataa?.userProfileImage 
                                                        ?
                                                            <img className="imagen-photo" alt="perfil" src={this.state.url+eachChat.userDataa?.userProfileImage.profile_image} />
                                                        :
                                                            <img alt="perfil-default" className="imagen-photo noPhoto" src={smile} />                                                         
                                                        }                                                                                                                
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