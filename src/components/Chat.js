/* eslint-disable eqeqeq */
import React, {Component} from 'react';
import ArrowBack from './ArrowBack'
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios'
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom';
import NewEvent from './NewEvent'
import Review from './Review'
import event_one from '../assets/svg/event1.svg'
import event_two from '../assets/svg/event2.svg'
import event_three from '../assets/svg/event3.svg'
import addevent from '../assets/svg/add-event.svg'
import startReview from '../assets/svg/star.svg'
import smile from '../assets/svg/smile-perfil.svg'

import '../components/styles/chat.css'

 

class Chat extends Component{
    constructor(props){
        super(props);
        this.textarea1 = React.createRef();
        this.socket = io.connect('http://3.8.170.106:3007');
        this.state = {
            user_id: "",
            to_user_id: "",
            service_room_id: "",
            service_user_id: "",
            room_id: "",
            name: "",
            imageUrl: "",
            chatData: "",
            form: {
                inputText: "",
                unique_code: ""
            },
            messages: [],
            allevents:[],
            allreviews: [],
            eventStatus: false,
            reviewStatus: false,
            reviewModifi: false,
            formReview:{
                kindness: "",
                knowledge: "",
                punctuality: "",
                comment: ""
            },
            typingStatus: false,
            onlineStatus: "offline",
            opcion: "",
            redirect: false,
        };
        this.fecha = ""
        this.handleInfoChat = this.handleInfoChat.bind(this)
    }

    UNSAFE_componentWillMount = () =>{
        if (!sessionStorage.getItem("userData")) {
            this.setState({
                redirect: true
            })
        }else{
            const idUser = JSON.parse(sessionStorage.getItem('userData'))
            const room_id = this.props.match.params.roomid
            const reciver_id = this.props.location.state.to_user_id
            const sender_id = parseInt(idUser.id)
            this.setState({
                user_id: idUser.id,
                room_id: room_id,
                service_room_id: this.props.location.state.serviceId,
                name: this.props.location.state.name,
                imageUrl: this.props.location.state.imageUrl,
                to_user_id: reciver_id,
                form:{
                    ...this.state.form,                    
                }
                
            })

            this.socket.emit('room join', {room_id, sender_id})
        }
    }

    componentDidMount = async() =>{
        let userServiceId

        try {
            await axios
            .post("/getSingleServices", {service_id: this.props.location.state.serviceId})
            .then(res =>{
                if (res.data.response) {
                    this.setState({
                        service_user_id: res.data.data.user_id
                    })
                    userServiceId = res.data.data.user_id
                }else{
                    console.log("No user service")
                    
                }
            })
        } catch (error) {
            console.log(error)
        }

        this.socket.on('message', message => {
            this.setState({ messages: [message, ...this.state.messages]})
            this.fetchAllEvents(userServiceId)
        })

        this.socket.on('changeStatus', status =>{
            this.fetchAllEvents(userServiceId)            
            let message = this.state.messages
            if (status.status == "") {                                
                let mess = this.state.messages.filter(each => each.event_id != status.user_id)                                
                this.setState({messages: mess})
            }else{            
                this.setState({messages: message})
            }            
        })

        this.socket.on('typeIn', msg => {
            if (msg.sender_id != this.state.user_id) {
                if (msg.message == "") {
                    this.setState({
                        typingStatus: false
                    })
                }else{
                    this.setState({
                        typingStatus: msg.status
                    })
                }
            }
        })

        this.socket.on('online', msg => {
            if (msg.sender_id != this.state.user_id) {
                this.setState({
                    onlineStatus: "online"
                })
            }
        })

        this.socket.on('room leave', msg =>{
            if (msg.sender_id != this.state.user_id) {
                this.setState({
                    onlineStatus: "offline"
                })
            }
        })

        const formOnline = {            
            room_id: this.state.room_id,
            sender_id: this.state.user_id
        }

        this.socket.emit('online', formOnline) 
        
        this.fetchCompleteChat() 
        this.fetchAllEvents(userServiceId)
        this.fetchReviews()
        this.fecthExistingReview()
        this.fetchStatusOnline()
        this.onlineSetStatus("online")
        window.addEventListener("beforeunload", (ev) => 
        {  
            ev.preventDefault();
            const formOffline = {
                room_id: this.state.room_id,
                sender_id: this.state.user_id,
                lastSeen: new Date()
            }           
            this.socket.emit("room leave", formOffline)
        });
    }

    componentWillUnmount = () =>{
        const formOffline = {
            room_id: this.state.room_id,
            sender_id: this.state.user_id,
            lastSeen: new Date()
        }
        this.socket.emit("room leave", formOffline)

        window.addEventListener("beforeunload", (ev) => 
        {  
            ev.preventDefault();
            this.socket.emit("room leave", formOffline)
        });
    }
 

    onlineSetStatus = async(status) =>{
        let formData = {
            user_id: this.state.user_id,
            onlineStatus: status
        }

        try {
            await axios
            .post("/onlineStatus", formData)
            .then(res => {
                if (res.data.response) {
                    // console.log("Status Updated")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    fetchStatusOnline = async() =>{
        let formData = {
            user_id: this.state.to_user_id
        }

        try {
            await axios
            .post("/onlineStatus", formData)
            .then(res => {
                if (res.data.response) {
                    this.setState({onlineStatus: res.data.data.onlineStatus})
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    fecthExistingReview = async () =>{
        const user_id = this.state.user_id
        const service_id = this.state.service_room_id

        try {
            await axios
            .post("/getReviewOfService", {user_id, service_id})
            .then(res =>{
                if (res.data.response) {
                    this.setState({
                        formReview:{
                            kindness: res.data.data.kindness,
                            knowledge: res.data.data.knowledge,
                            punctuality: res.data.data.punctuality,
                            comment: res.data.data.comment,                            
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    fetchReviews = async() =>{
        const service_id = this.state.service_room_id

        try {
            await axios
            .post("/getReviews", {service_id})
            .then(res =>{
                if (res.data.response) {
                    this.setState({
                        allreviews: res.data.data.rows
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    fetchAllEvents = async(serviceId) =>{
        const user_id = parseInt(serviceId)
        try {
            await axios
            .post("/allEvents", {user_id})
            .then(res =>{
                if (res.data.response) {                    
                    this.setState({
                        allevents: res.data.data
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    fetchCompleteChat = async () => {
        const room_id = this.state.room_id
        try {
            await axios
            .post("/get_full_conversation_website", {room_id})
            .then(res => {
                if (res) {
                    this.setState({
                        chatData: res.data.data
                    })
                }else{
                    console.log("No verdadero")
                    console.log(res)
                }
        })
        } catch (error) {
            console.log(error)
        }
    }

    handleInfoChat = (mensajes) => {
        if (mensajes != "") {
            // eslint-disable-next-line array-callback-return
            return mensajes.rows.map( (eachMes, index) => {   
                
                const idEvent = eachMes.event_id
                let eachEvent = this.state.allevents.filter(eve => eve.id == idEvent)
                // eslint-disable-next-line array-callback-return
                let eachReview = this.state.allreviews.filter(rew =>{
                    if (rew.user_id == this.state.user_id || rew.user_id == this.state.to_user_id) {
                        return true
                    }
                })
                const formRead = {
                    room_id: this.state.room_id,
                    unique_code: eachMes.unique_code,                    
                }

                this.socket.emit('message read', formRead)

                if (eachMes.sender_id == this.state.user_id) {
                    if (eachMes.event_id != null) {
                        if (eachMes.message_type == 'review') {
                            return this.handleInfoReview(eachMes,eachReview)
                        }else if(eachMes.message_type == 'event'){
                            return this.handleInfoEvent(eachMes,eachEvent[0]?.status, idEvent)
                        }                        
                    }else{
                        return(                        
                            <React.Fragment key={index}>
                            {this.handleTimeMessage(eachMes)}
                            <div className="d-flex flex-row-reverse mt-3" key={index}>                                
                                <div className="p-2 texto-2 texto-azul texto-chat-box">{eachMes.message}</div>
                            </div>
                            </React.Fragment>
                        )
                    }
                }else{
                    if (eachMes.event_id != null) {
                        if (eachMes.message_type == 'review') {
                            return this.handleInfoReview(eachMes,eachReview)
                        }else if(eachMes.message_type == 'event'){
                            return this.handleInfoEvent(eachMes,eachEvent[0]?.status, idEvent)
                        }  
                    }else{
                        return (
                            <React.Fragment key={index}>
                            {this.handleTimeMessage(eachMes)}
                            <div className="d-flex flex-row mt-3" key={index}>                                
                                <div className="p-2 texto-2 texto-chat-box">{eachMes.message}</div>
                            </div>
                            </React.Fragment>
                        )
                    }                    
                }
            })
        }
    }
    
    handleInfoReview = (mes,review) =>{
        if (mes.sender_id == this.state.user_id) {
            if (review[0]) {
                return(
                <React.Fragment key={mes.id}>
                {this.handleTimeMessage(mes)}
                <div  className="p-2 flex-row-reverse mt-3 mt-1 mr-1 review-user-right">                    
                    <div className="d-flex event-box1 review-box1 event-font ">
                        <img alt="estrella" src={startReview} />
                        <div>Valoración</div>
                    </div>
                    <div className="event-box2 mt-1 review-box2">
                        <div>{Math.round(review[0].avg_rating)+" estrellas"}</div>
                    </div>
                    <button onClick={this.handleClickReviewModi} className="btn-event mt-2 event-font review-btn">Modificar</button>
                </div>
                </React.Fragment>
                )
            }else{
                return(
                <React.Fragment key={mes.id}>
                {this.handleTimeMessage(mes)}
                <div key={mes.id} className="p-2 flex-row-reverse mt-3 mt-1 mr-1 review-user-right">                    
                    <div className="d-flex event-box1 review-box1 event-font ">
                        <img alt="estrella" src={startReview} />
                        <div>Valoración</div>
                    </div>
                    <div className="event-box2 mt-1 review-box2">
                        <div>{"Valorar a "+this.state.name}</div>
                    </div>
                    <button onClick={this.handleClickReview} className="btn-event mt-2 event-font review-btn">Valorar</button>
                </div>
                </React.Fragment>
                ) 
            }
        }else{
            if (review[0]) {
                return(
                <React.Fragment key={mes.id}>
                {this.handleTimeMessage(mes)}
                <div  className="p-2 flex-row-reverse mt-3 mt-1 mr-1 ml-1">                    
                    <div className="d-flex event-box1 review-box1 event-font ">
                        <img alt="estrella" src={startReview} />
                        <div>Valoración</div>
                    </div>
                    <div className="event-box2 mt-1 review-box2">
                        <div>{Math.round(review[0].avg_rating)+" estrellas"}</div>
                    </div>                    
                </div>
                </React.Fragment>
                )
            }else{
                return(
                <React.Fragment key={mes.id}>
                {this.handleTimeMessage(mes)}                    
                <div  className="p-2 flex-row-reverse mt-3 mt-1 mr-1 ml-1">                    
                    <div className="d-flex event-box1 review-box1 event-font ">
                        <img alt="estrella" src={startReview} />
                        <div>Valoración</div>
                    </div>
                    <div className="event-box2 mt-1 review-box2">
                        <div>Esperando Valoración</div>
                    </div>
                </div>
                </React.Fragment>
                ) 
            }
        }
    }

    handleClickReview = () =>{
        this.setState({
            reviewStatus: true
        })
    }

    handleClickReviewModi = () =>{
        this.setState({
            reviewStatus: true
        })
    }

    handleSubmitReview = (newData) =>{

        this.setState({
            reviewStatus: false,
            allreviews: [newData]
        })
    }
 
    


    handleInfoEvent = (mess, status, idEvent) =>{                
        if (mess.sender_id == this.state.user_id) {
            if (status == "active") {
                return( 
                    <div key={mess.id} className="p-2 flex-row-reverse mt-3 mt-1 mr-1 event-azul" >
                        <div className="d-flex event-box1 event-font event-azul-fondo">
                            <img alt="evento 1" src={event_one}></img>
                            <div>Evento Pendiente</div>
                        </div>
                        <div className="event-box2 mt-1 event-font event-azul-fondo">{mess.message}</div>
                        <button onClick={(e) => this.handleCancelarPen(e, idEvent)} className="btn-event mt-2 event-font event-confir">Cancelar</button>
                    </div> 
                )
            }else if (status == "accepted"){
                return(
                    <div key={mess.id} className="p-2 flex-row-reverse mt-3 mt-1 mr-1 event-azul" >
                        <div className="d-flex event-box1 event-font event-azul-fondo">
                            <img alt="evento 1" src={event_two}></img>
                            <div>Evento Confirmado</div>
                        </div>
                        <div className="event-box2 mt-1 event-font event-azul-fondo">{mess.message}</div>
                        <button onClick={(e) => this.handleCanclearConfir(e, idEvent)} className="btn-event mt-2 event-font">Cancelar</button>
                    </div> 
                )
            }else if (status == "rejected"){
                return(
                    <div key={mess.id} className="p-2 flex-row-reverse mt-3 mt-1 mr-1 event-azul" >
                        <div className="d-flex event-box1 event-font event-azul-fondo">
                            <img alt="evento 1" src={event_three}></img>
                            <div>Evento Cancelado</div>
                        </div>
                        <div className="event-box2 mt-1 event-font event-azul-fondo">{mess.message}</div>
                    </div> 
                )
            }
        }else{
            if (status == "active") {
                return(
                    <div key={mess.id} className="p-2 flex-row mt-3 mt-1 ml-1" >
                        <div className="d-flex event-box1 event-font">
                            <img alt="evento 1" src={event_one}></img>
                            <div>Evento Pendiente</div>
                        </div>
                        <div className="event-box2 mt-1 event-font">{mess.message}</div>
                        <button onClick={(e) => this.handleClickEventConfir(e,idEvent)} className="btn-event mt-2 event-font">Confirmar</button>
                    </div>
                )
            }else if (status == "accepted"){
                return(
                    <div key={mess.id} className="p-2 flex-row mt-3 mt-1 ml-1" >
                        <div className="d-flex event-box1 event-font">
                            <img alt="evento 1" src={event_two}></img>
                            <div>Evento Confirmado</div>
                        </div>
                        <div className="event-box2 mt-1 event-font">{mess.message}</div>
                        <button onClick={(e) => this.handleCanclearConfir(e,idEvent)} className="btn-event mt-2 event-font">Cancelar</button>
                    </div>
                )
            }else if (status == "rejected"){
                return(
                    <div key={mess.id} className="p-2 flex-row mt-3 mt-1 ml-1" >
                        <div className="d-flex event-box1 event-font">
                            <img alt="evento 1" src={event_three}></img>
                            <div>Evento Cancelado</div>
                        </div>
                        <div className="event-box2 mt-1 event-font">{mess.message}</div>
                    </div>
                )
            }
        }        
    }

    handleCanclearConfir = async (e,event_id) =>{
        e.preventDefault()
        const status = "rejected"

        let formStatus = {
            room_id: this.state.room_id,
            user_id: event_id,
            status: status
        }

        try {
            await axios
            .post("/editEvent", {event_id, status})
            .then(res =>{
                if (res.data.response) {
                    this.socket.emit('changeStatus', formStatus)
                }else{
                    console.log("Error haciendo el update")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleClickEventConfir = async (e,event_id) =>{
        e.preventDefault()
        const status = "accepted"

        let formStatus = {
            room_id: this.state.room_id,
            user_id: event_id,
            status: status
        }

        try {
            await axios
            .post("/editEvent", {status, event_id})
            .then(res =>{   
                if (res.data.response) {
                    this.socket.emit('changeStatus', formStatus)
                }else{
                    console.log("Error haciendo el update")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleCancelarPen = async (e,event_id) =>{
        e.preventDefault()

        let formStatus = {
            room_id: this.state.room_id,
            user_id: event_id,
            status: ""
        }

        try {
            await axios
            .post("/deleteEvent", {event_id})
            .then(res =>{
                if (res.data.response) {
                    this.socket.emit('changeStatus', formStatus)
                }else{
                    console.log("Error elimimando")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    
    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })

    
        if (e.target.value == "") {
            let formData = {
                room_id: this.state.room_id,
                sender_id: this.state.user_id,
                message: e.target.value
            }
            this.socket.emit('typeIn', formData)            
        }else{
            let formData = {
                room_id: this.state.room_id,
                sender_id: this.state.user_id,
                message: e.target.value
            }
            this.socket.emit('typeIn', formData)            
        }

    }

    arrowBackButton = () =>{
        this.props.history.goBack()
    }

    handleClick = (e) =>{
        e.preventDefault()
        let formData = {
            room_id: this.state.room_id,
            message: this.state.form.inputText,
            sender_id: this.state.user_id,
            receiver_id: this.state.to_user_id,
            unique_code: Date.now()+Math.floor(Math.random() * Math.floor(10))+parseInt(this.state.room_id),
            local_time: new Date()
        }

        if (this.state.form.inputText != "") {
            this.socket.emit('message', formData)
            this.setState({
                form:{
                    inputText: ""
                }
            })

            let formTyping = {
                room_id: this.state.room_id,
                sender_id: this.state.user_id,
                message: ""
            }
            this.socket.emit('typeIn', formTyping)
        }
    }

    handleClickAddEvent = () =>{
        this.setState({
            eventStatus: true
        })
    }

    handleCloseEvent = () =>{
        this.setState({
            eventStatus: false
        })
    }

    handleCloseReview = () =>{
        this.setState({
            reviewStatus: false
        })
    }

    submitEvent = async (dateStart, hourStart, hourfisnish, timeZone) =>{
        this.setState({
            eventStatus: false
        })

        const service_id = this.state.service_room_id
        let userServiceId
        let eventId

        try {
            await axios
            .post("/getSingleServices", {service_id: service_id})
            .then(res =>{
                if(res.data.response){
                    let user_res_id = res.data.data
                    userServiceId =user_res_id.user_id
                }else{
                   console.log("error en res") 
                }
            })
        } catch (error) {
            console.log(error)
            return false
        }

        let formDataEvent = new FormData()
        formDataEvent.append("date",dateStart)
        formDataEvent.append("timeZone","europe/madrid")
        formDataEvent.append("start_time",hourStart)
        formDataEvent.append("finish_time",hourfisnish)
        formDataEvent.append("user_id",parseInt(this.state.user_id))
        formDataEvent.append("service_user_id",parseInt(userServiceId))
        formDataEvent.append("service_id",service_id)
        formDataEvent.append("reminder1","1 hora antes")
        formDataEvent.append("status","active")        

        try {
            await axios
            .post("/addEvent", formDataEvent)
            .then(res =>{
                if (res.data.response) {
                    console.log(res.data)
                    eventId = res.data.data.id
                }else{
                    console.log("error con res")
                }
            })
        } catch (error) {
            console.log(error)
        }

        let formData = {
            room_id: this.state.room_id,
            message: dateStart+"   |   "+hourStart,
            sender_id: this.state.user_id,
            receiver_id: this.state.to_user_id,
            event_id: eventId,
            unique_code: Date.now()+Math.floor(Math.random() * Math.floor(10))+parseInt(this.state.room_id),
            local_time: new Date(),
            message_type: "event"
        }        

        this.socket.emit('message', formData)

    }

    formatDate = (date, option1) => {
        let d = new Date(date),
            month = d.getMonth() + 1,
            day =  d.getDate(),
            year = d.getFullYear();
        
            if (day.length < 2) 
            day = '0' + day;

        let acutalDate = new Date()

        if (!option1) {
            option1 = false
        }

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

        // if (day.length < 2) 
        //     day = '0' + day;
    
        if (year != acutalDate.getFullYear() || option1) {
            return [day, month, year].join(' ');    
        }else{
            return [month, day].join(' ');    
        }
    }

    handleTimeMessage = (messa) =>{
        let datemessage = this.formatDate(messa.created_date, true)
        let currentDay = this.formatDate(new Date(), true)

        if (datemessage != this.fecha) {
            this.fecha = datemessage
            if (datemessage == currentDay) {
                return (<div className="fechaMesa">Hoy</div>)
            } else {
                return (<div className="fechaMesa">{datemessage}</div>)
            }                    
        }
    }


    render(){
        
        if (this.state.eventStatus) {
            return (
                <NewEvent 
                    subEvent={this.submitEvent}
                    closeEvent={this.handleCloseEvent}
                />
            )
        }

        if (this.state.reviewStatus) {
            return(
                <Review
                    userid={this.state.user_id}
                    serviceUserId={this.state.service_user_id}    
                    serviceId={this.state.service_room_id}
                    formReview={this.state.formReview}
                    modi={this.state.reviewModifi}
                    onSubmitEvent={this.handleSubmitReview}
                    closeReview={this.handleCloseReview}
                />
            )
        }

        const messages = this.state.messages.map((message, index) => {
            const idEvent = message.event_id
            let status = this.state.allevents.filter(eve => eve.id == idEvent)

            if (message.sender_id == this.state.user_id) {
                if (message.event_id != null) {
                    return this.handleInfoEvent(message,status[0]?.status, idEvent)
                }else{
                    return(   
                        <React.Fragment>
                        {this.handleTimeMessage(message)}                     
                        <div className="d-flex flex-row-reverse mt-3" key={index}>
                          <div className="p-2 texto-2 texto-azul texto-chat-box">{message.message}</div>
                        </div>
                        </React.Fragment>
                    )
                }
            }else{
                if (message.event_id != null) {
                    return this.handleInfoEvent(message,status[0]?.status, idEvent)
                }else{
                    return (
                        <React.Fragment>
                        {this.handleTimeMessage(message)}  
                        <div className="d-flex flex-row mt-3" key={index}>
                            <div className="p-2 texto-2 texto-chat-box">{message.message}</div>
                        </div>
                        </React.Fragment>
                    )
                }
            }
          }); 

        const statusImage = this.state.imageUrl.split("/")               

        return(
            <div className="d-flex tamaño-window" >
                <div className="flex-column top-chat ">
                    <div className="p-2 arriba" > 
                        <div className="d-flex ejemplo">
                            <div className="arrowBackChat" onClick={this.arrowBackButton}><ArrowBack /></div>                                            
                            {statusImage[statusImage.length-1] != "undefined" 
                            ? 
                                <div className="lazy-load">
                                    <img id="imagen-current-chat" alt="imagen-perfil" src={this.state.imageUrl} />
                                </div>
                            :
                                <div className="lazy-load lazy-load-no">
                                    <img id="imagen-current-chat" alt="imagen-default-perfil" src={smile} />
                                </div>
                            }                            
                            <div className="texto-desing texto-chat-current">{this.state.name}</div>
                            {this.state.onlineStatus == "online" 
                            ? 
                            <div className="d-flex contaier-online">
                                <div className="ciruclo-online"></div>
                                <div className="texto-desing texto-chat-current online-text">En Linea</div>
                            </div>
                            :
                            null    
                            }
                            {this.state.typingStatus ? <div className="texto-desing texto-chat-current typing-live">Escribiendo...</div>: null}
                        </div>
                    </div>
                    <ScrollToBottom className="box-chat box-chat-scroll"  >                                                  
                        {this.handleInfoChat(this.state.chatData)}
                        {messages.reverse()}                                                                                                                                                 
                    </ScrollToBottom>
                    <div className="input-text-box d-flex">
                        <TextareaAutosize onChange={this.handleChange} value={this.state.form.inputText} name="inputText" maxRows={2} id="entrada-chat" placeholder="Escriba" className="input-entrada p-2"></TextareaAutosize>                   
                        {this.state.form.inputText == "" 
                        ?
                        <button onClick={this.handleClickAddEvent} className="btn-accion p-2">                                                
                                <div><img alt="icono-evento" src={addevent}></img></div>                        
                                {/* <div><img alt="icono-evento" className="icon-envio" src={require('../assets/img/icon/enviar-chat.png')}></img></div>                                                                                 */}
                        </button>
                        :
                        <button onClick={this.handleClick} className="btn-accion p-2">                                                
                                {/* <div><img alt="icono-evento" src={addevent}></img></div>                         */}
                                <div><img alt="icono-evento" className="icon-envio" src={require('../assets/img/icon/enviar-chat.png')}></img></div>                                                                                
                        </button>
                        }                                             
                    </div>
                </div>
            </div>
            // style={{height: tamaño+"px"}}
        )
    }

}

export default Chat;