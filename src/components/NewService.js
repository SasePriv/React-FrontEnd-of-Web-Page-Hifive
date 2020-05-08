/* eslint-disable no-fallthrough */
/* eslint-disable eqeqeq */
import React, {Component} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios'
import ArrowBack from './ArrowBack'
import Geocode from "react-geocode";
import Map from './Map'
import { GOOGLE_API_KEY } from '../googleApiKey.js'
import {Redirect} from 'react-router-dom'

import './styles/newservice.css'
import caraBoy from '../assets/svg/cara-boy.svg'
import niña from '../assets/svg/niña.svg'
import simMas from '../assets/svg/mas.svg'
import menos from '../assets/svg/menos.svg'
import geomap from '../assets/svg/geo.svg'
import spain from '../assets/svg/spain.svg'
import uss from '../assets/svg/uss.svg'
import germany from '../assets/svg/germany.svg'
import italy from '../assets/svg/italy.svg'
import france from '../assets/svg/france.svg'
import videoPhoto from '../assets/img/video.png'

Geocode.setApiKey(GOOGLE_API_KEY)
Geocode.enableDebug();

class NewService extends Component{
    constructor(){
        super();
        this.state = {
            service_id: "",
            user_id: "",
            error: "",      
            imageFile:{
                file1: null,
                file1Url: null,
                file1Type: "",
                file1Id: "",
                file2: null,
                file2Url: null,
                file2Type: "",
                file2Id: "",
                file3: null,
                file3Url: null,
                file3Type: "",
                file3Id: "",
                file4: null,
                file4Url: null,
                file4Type: "",
                file4Id: "",
            },   
            form:{
                title: "",
                description: "",
                category: "",
                price: "",
                address: "",
                latitude: "",
                longitude: "",
                monday: "",
                tuesday: "",
                wednesday: "",
                thursday: "",
                friday: "",
                saturday: "",
                sunday: "",
                monday_time: "",
                tuesday_time: "",
                wednesday_time: "",
                thursday_time: "",
                friday_time: "",
                saturday_time: "",
                sunday_time: "",
                spanish: 0,
                english: 0,
                french: 0,
                italian: 0,
                german: 0,
                experience: "0-2",
                service_type: "onsite",

            },
            inputError: {
                fileError: "",
                titleError: "",
                descriptionError: "",
                categoryError: "",
                priceError: "",
                checkCountryError: "",
                checkDayError: ""
            },
            monday: [false,false],
            tuesday: [false,false],
            wednesday: [false,false],
            thursday: [false,false],
            friday: [false,false],
            saturday: [false,false],
            sunday: [false,false],
            redirect: false,
            redirecToView: false,
            createServiceId: "",
            urlService: "https://ec2-35-178-169-125.eu-west-2.compute.amazonaws.com/hifive-rest-api/public/serviceImages/",
        }

        this.fetchInfoServices = this.fetchInfoServices.bind(this)
    }

    // Componente que verifica si hay sesion abierta y si existe un servicio para poner el modo editar
    
    UNSAFE_componentWillMount = () =>{
        if (!sessionStorage.getItem("userData")) {
            this.setState({
                redirect: true
            })
        }else{
            const datosStorage = JSON.parse(sessionStorage.getItem('userData'))
            this.setState({
            user_id: datosStorage.id
            })

            if(this.props.match.params.id){
            const idservice  = this.props.match.params.id

            this.setState({
                service_id: idservice
            })
            }
        }
    }
  
    // Componente antes de que se monte el componente que hace los fetch de la info si es que existe un servicio para editar
    async componentDidMount(){
        if(this.state.service_id){
            await this.fetchInfoServices()          
            this.fetchinfoCheckDays()       
        }else{
            this.setState({
                form:{
                    ...this.state.form,
                    address: "Madrid",
                    latitude: 40.416775,
                    longitude: -3.703790
                }
            })
        }
    }
 
    // Haciendo el fecth de la informacion
    fetchInfoServices = async () => {
 
        const service_id = this.state.service_id

        try {
            await axios
            .post('/getSingleServices', { service_id })
            .then(res => {
            if (res.data.response) {            
                
                for (let index = 0; index < res.data.data.serviceImage?.length; index++) {
                    let temp = index + 1
                    if (res.data.data.serviceImage[index].type == "image") {
                        this.setState({                        
                            imageFile: {
                                ...this.state.imageFile,
                                ["file"+temp.toString()]: "server",
                                ["file"+temp.toString()+"Url"]: this.state.urlService+res.data.data.serviceImage[index].attachment,
                                ["file"+temp.toString()+"Type"]:  res.data.data.serviceImage[index].type,
                                ["file"+temp.toString()+"Id"]: res.data.data.serviceImage[index].id
                            }
                        })  
                    }else{
                        this.setState({                        
                            imageFile: {
                                ...this.state.imageFile,
                                ["file"+temp.toString()]: "server",
                                ["file"+temp.toString()+"Url"]: videoPhoto,
                                ["file"+temp.toString()+"Type"]:  res.data.data.serviceImage[index].type,
                                ["file"+temp.toString()+"Id"]: res.data.data.serviceImage[index].id
                            }
                        })
                    }
                      
                }

                this.setState({
                    form: {
                        title: res.data.data.title,
                        description: res.data.data.description,
                        category: res.data.data.category,
                        price: res.data.data.price,
                        address: res.data.data.address,
                        latitude: parseFloat(res.data.data.latitude),
                        longitude:  parseFloat(res.data.data.longitude),
                        monday: res.data.data.monday,
                        tuesday: res.data.data.tuesday,
                        wednesday: res.data.data.wednesday,
                        thursday: res.data.data.thursday,
                        friday: res.data.data.friday,
                        saturday: res.data.data.saturday,
                        sunday: res.data.data.sunday,
                        monday_time: res.data.data.monday_time,
                        tuesday_time: res.data.data.tuesday_time,
                        wednesday_time: res.data.data.wednesday_time,
                        thursday_time: res.data.data.thursday_time,
                        friday_time: res.data.data.friday_time,
                        saturday_time: res.data.data.saturday_time,
                        sunday_time: res.data.data.sunday_time,
                        spanish: res.data.data.spanish,
                        english: res.data.data.english,
                        french: res.data.data.french,
                        italian: res.data.data.italian,
                        german: res.data.data.german,
                    }
                })                
            }else{
                this.setState({
                error: res.data.message
                })
            }   
            })
        } catch (error) {
            console.log(error)
        }
    }

    // funcion para ponerle valores a los checkbox

    fetchinfoCheckDays = () => {
        this.setCheckboxDays(this.state.form.monday, this.state.form.monday_time, "monday", this.state.monday)
        this.setCheckboxDays(this.state.form.tuesday, this.state.form.tuesday_time, "tuesday", this.state.tuesday)
        this.setCheckboxDays(this.state.form.wednesday, this.state.form.wednesday_time, "wednesday", this.state.wednesday)
        this.setCheckboxDays(this.state.form.thursday, this.state.form.thursday_time, "thursday", this.state.thursday)
        this.setCheckboxDays(this.state.form.friday, this.state.form.friday_time, "friday", this.state.friday)
        this.setCheckboxDays(this.state.form.saturday, this.state.form.saturday_time, "saturday", this.state.saturday)
        this.setCheckboxDays(this.state.form.sunday, this.state.form.sunday_time, "sunday", this.state.sunday)
    }

    // funcion Poner valores a los dias 

    setCheckboxDays = (day, dayTime, dayName, arrayDay) =>{
        let temp = arrayDay
        if (day == 1) {
            switch (dayTime) {
                case "eve":
                    temp[1] = true
                    break;
                case "mor":
                    temp[0] = true
                    break;
                case "both":
                    temp[0] = true
                    temp[1] = true
                default:
                    break;
            }

            this.setState({                
               [dayName] : temp
            })
        }
    }

    //funcion para transformar los checkbox para el form    

    chagneCheckboxDaysToForm = (day, dayofWeek) =>{
        if (day[0]) {
            this.setState({
                form:{
                    ...this.state.form,
                    [dayofWeek]: 1 
                }                
            })
            if(day[1]){
                return "both"
            }else{
                return "mor"
            }
        }else if(day[1]){
            this.setState({
                form:{
                    ...this.state.form,
                    [dayofWeek]: 1     
                }                
            })
            return "eve"
        }else{
            return null
        }
    }


    handleChangeFile = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0].type.split("/")[0] == "video") {
                this.setState({
                    imageFile: {
                        ...this.state.imageFile,
                        [e.target.name]: e.target.files[0],
                        [e.target.name+"Url"]: videoPhoto,
                        [e.target.name+"Type"]: e.target.files[0].type.split("/")[0]
                    }
                })
            } else {
                this.setState({
                    imageFile: {
                        ...this.state.imageFile,
                        [e.target.name]: e.target.files[0],
                        [e.target.name+"Url"]: URL.createObjectURL(e.target.files[0]),
                        [e.target.name+"Type"]: e.target.files[0].type.split("/")[0]
                    }
                }) 
            }
                       
        }
    }

    handleChangeCheckbox = (e, day) =>{

        if (e.target.name == "mor") {
            day[0] = e.target.checked            
            this.setState({
                [e.target.id] : day 
            })            
        }else{            
            day[1] = e.target.checked
            this.setState({
                [e.target.id] : day 
            })
        }

        console.log(this.state.monday)
    }

    handleChangeInput = (e) =>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(e.target.name + " : " + e.target.value)
    }

    handleCheckContruy= (e) =>{

        if (e.target.checked) {
            this.setState({
                form: {
                    ...this.state.form,
                    [e.target.name]: 1
                }
            })
        }else{
            this.setState({
                form: {
                    ...this.state.form,
                    [e.target.name]: 0
                }
            })
        } 
    }

    //Submit

    handleSubmit = async (e) =>{
        e.preventDefault()
        if(this.state.service_id){
            console.log("editar")

            let form = this.state.form
            form.service_id = this.state.service_id
            form.user_id = this.state.user_id
            form.monday_time = this.chagneCheckboxDaysToForm(this.state.monday, "monday")
            form.tuesday_time = this.chagneCheckboxDaysToForm(this.state.tuesday, "tuesday")
            form.wednesday_time = this.chagneCheckboxDaysToForm(this.state.wednesday, "wednesday")            
            form.thursday_time = this.chagneCheckboxDaysToForm(this.state.thursday, "thursday")
            form.friday_time = this.chagneCheckboxDaysToForm(this.state.friday, "friday")
            form.saturday_time = this.chagneCheckboxDaysToForm(this.state.saturday, "saturday")
            form.sunday_time = this.chagneCheckboxDaysToForm(this.state.sunday, "sunday")            
            form = this.formDaySet(form)

            const isValidate = this.validateInputs()

            try {
                if (isValidate) {
                    await axios
                    .post('/editUserServices', form)
                    .then(res => {
                        if (res.data.response) {
                            this.setState({
                                redirecToView: true,                                
                            })
                        }                        
                    })
                }
            } catch (error) {
                console.log(error)
            }

        }else{
            let form = this.state.form
            form.user_id = this.state.user_id
            form.monday_time = this.chagneCheckboxDaysToForm(this.state.monday, "monday")
            form.tuesday_time = this.chagneCheckboxDaysToForm(this.state.tuesday, "tuesday")
            form.wednesday_time = this.chagneCheckboxDaysToForm(this.state.wednesday, "wednesday")            
            form.thursday_time = this.chagneCheckboxDaysToForm(this.state.thursday, "thursday")
            form.friday_time = this.chagneCheckboxDaysToForm(this.state.friday, "friday")
            form.saturday_time = this.chagneCheckboxDaysToForm(this.state.saturday, "saturday")
            form.sunday_time = this.chagneCheckboxDaysToForm(this.state.sunday, "sunday")            
            form = this.formDaySet(form)

            const isValidate = this.validateInputs()
            let service_id = ""

            try {
                if (isValidate) {
                    await axios
                    .post('/addUserServices', form)
                    .then(res => {
                        if (res.data.response) {
                            this.setState({
                                redirecToView: true,
                                createServiceId: res.data.data.id
                            })
                            service_id = res.data.data.id
                            this.addFileImagetoService(service_id)                            
                        }
                    })
                }
            } catch (error) {
                
            }

        }
    }

    addFileImagetoService = async (service_id) => {
        const user_id = this.state.user_id
        const files = ["file1", "file2", "file3", "file4"]
        files.forEach(async (eachFile) => {
            if (this.state.imageFile[eachFile] != null) {
                if (this.state.imageFile[eachFile+"Id"] == "") {
                    let attachment = this.state.imageFile[eachFile]
                    let formData = new FormData()
                    formData.append("attachment", attachment)
                    try {                    
                        await axios
                        .post(`/addServicesImage/${this.state.imageFile[eachFile+"Type"]}/${user_id}/${service_id}`, formData, {
                            headers: {'content-type': 'multipart/form-data'}
                        })
                        .then(res => {
                            if (res.data.response) {
                                console.log("Se ha agragado perfecto")                            
                            }
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }                
            }
        })
        
    }

    formDaySet = (form) =>{
        const listaDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        const funx = (day) =>{
            if (this.state[day][0]) {
                return 1
            }else if(this.state[day][1]){
                return 1
            }else{
                return 0
            }
        }

        listaDays.forEach(day => {
            form[day] = funx(day) 
        });

        return form
    }

    arrowBackButton = () =>{
        this.props.history.goBack()
    }

    validateInputs = () => {
        const listaDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        //File
        if (this.state.imageFile.file1 == null && this.state.imageFile.file2 == null && this.state.imageFile.file3 == null && this.state.imageFile.file4 == null) {
            this.setState({
                inputError: {                    
                    fileError: "Por favor agrega al menos una foto"
                }
            })
            return false
        }else{
            this.setState({
                inputError: {                    
                    fileError: ""
                }
            })
        }
        //title
        if (this.state.form.title == "") {
            this.setState({
                inputError: {                    
                    titleError: "Por favor introduza un titulo"
                }
            })
            return false
        }else{
            this.setState({
                inputError: {                    
                    titleError: null
                } 
            })    
        }
        // Description
        if (this.state.form.description == ""){
            this.setState({
                inputError: {                    
                    descriptionError: "Por favor introduzca una descripcion"
                }
            })
            return false
        }else{
            this.setState({
                inputError: {                    
                    descriptionError: ""
                }
            })
        }
        //Category
        if (this.state.form.category == "") {
            this.setState({
                inputError:{
                    categoryError: "Por favor seleccione una categoria"
                }
            })
            return false
        }else{
            this.setState({
                inputError:{
                    categoryError: ""
                }
            })
        }
        //Price
        if (this.state.form.price == ""){
            this.setState({
                inputError:{                    
                    priceError: "Por favor introduzca un precio"
                }
            })
        }else{
            this.setState({
                inputError:{                    
                    priceError: ""
                }
            })
        }
        if (this.state.form.price == ""){
            this.setState({
                inputError:{                    
                    priceError: "Por favor introduza un valor"
                }
            })
            return false
        }else{
            this.setState({
                inputError:{                    
                    priceError: ""
                }
            })
        }
        //CheckDays
        var temp = false
        listaDays.forEach( (day, index) => {
            if (this.state[day][0] == true || this.state[day][1] == true) {
                temp = true
            }
        })
        if(!temp){
            this.setState({
                inputError:{
                    ...this.state.inputError,
                    checkDayError: "Por favor seleccione al menos un dia"
                }
            })
            return false
        }else{
            this.setState({
                inputError:{                    
                    checkDayError: ""
                }
            }) 
        }
        //Leanguaje
        if (this.state.form.spanish == 0 && this.state.form.italian == 0 && this.state.form.german == 0 && this.state.form.english == 0 && this.state.form.french == 0) {
            this.setState({
                inputError:{                    
                    checkCountryError: "Por favor eliga un idioma"
                }
            })
            return false
        }else{
            this.setState({
                inputError:{                    
                    checkCountryError: ""
                }
            })
        }

        return true
    } 

    //GOOGLE MAPS 

    handleMyGeolocalitation = (e) =>{        
        this.getLocation()
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    getCoordinates = (position) =>{        
        this.setState({
            form: {
                ...this.state.form,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
        },
        () => {
            this.getCurrentAddres()    
            }
        )
    }

    /**
     * Get the current address from the default map position and set those values in the state
     */

    getCurrentAddres = () => {
        Geocode.fromLatLng( this.state.form.latitude , this.state.form.longitude ).then(
            response => {
                const address = response.results[0].formatted_address        
                this.setState({
                    form:{
                        ...this.state.form,
                        address: ( address ) ? address : '',
                    }                    
                })
            },
            error => {
                console.error(error);
            }
        );
    }  

    handleLocationError = (error) =>{
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
            default:
                alert("An unknown error occurred.")                
        }
    }

    vamos = (e) =>{
        this.getLatLngFromAdrress(e.target.value)
    }

    getLatLngFromAdrress = (direction) =>{
        Geocode.fromAddress(direction).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({
                    form:{   
                        ...this.state.form,     
                        address: direction,                
                        latitude: lat,
                        longitude: lng
                    }
                })
                console.log(lat, lng);
            },
            error => {
                console.error(error);
            }
        );  
    }

    handleRemoveImageService = async (e, number,selectFile) =>{
        e.preventDefault()
        let files = this.state.imageFile               
        if (files[selectFile+"Id"] == "") {            
            this.setState({                
                imageFile:{
                    ...this.state.imageFile,
                    [selectFile]: null,
                    [selectFile+"Url"]: null,
                    [selectFile+"Type"]: ""
                }

            })
        }else{
            try {
                await axios
                .post(`/removedAttachement/${files[selectFile+"Id"]}`)
                .then(res => {
                    if (res.data.response) {
                        this.setState({
                            imageFile:{
                                ["file"+number]: null,
                                ["file"+number+"Url"]: null,
                                ["file"+number+"Type"]: "",
                                ["file"+number+"Id"]: "",
                            }
                        })
                    }else{
                        console.log("error eliminando")
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }        
    }

    /**
     * When the marker is dragged you get the lat and long using the functions available from event object.
     * Use geocode to get the address, city, area and state from the lat and lng positions.
     * And then set those values in the state.
     *
     * @param event
     */
    onMarkerDragEnd = ( event ) => {
        console.log( 'event', event );
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng()
        Geocode.fromLatLng( newLat , newLng ).then(
            response => {
                const address = response.results[0].formatted_address
                this.setState( {
                    form:{
                        ...this.state.form,
                        address: ( address ) ? address : '',
                        latitude: newLat,
                        longitude: newLng
                    }
                } )
            },
            error => {
                console.error(error);
            }
        );  
    };


    render(){ 

        if (this.state.redirect) {
            return (<Redirect to="/" />)
        }

        if(this.state.redirecToView){
            return (<Redirect to={`/viewService/${this.state.createServiceId}`} />)
        }

        // console.log(this.state.imageFile["file1"])
        // console.log(this.state.imageFile["file2"] != null)
        // console.log(this.state.imageFile["file1"+"Type"])
          
        return(
            <div className="d-flex  p-out tamaño-window">                
                <form onSubmit={this.handleSubmit} className="flex-column" style={{width: "100%"}}>      
                    <div  className="p-2" onClick={this.arrowBackButton}><ArrowBack /></div>          
                    <div className="p-2 centrar-text centrar headerTitulo" id="titulo-header" style={{marginTop: "-9px"}}>{this.state.service_id != "" ? "Editar" : "Nuevo"} servicio</div>                            
                    <div  className="p-2 textoSercice" id="titulo-foto">Fotos/videos</div>
                    <div className="p-2">
                        <div className="d-flex flex-row justify-content-center">
                            <div className="p-2 sepa-derecho">
                                <fieldset className="cuadro">
                                    <legend onClick={this.state.imageFile.file1 != null ? (e) => this.handleRemoveImageService(e,1,"file1") : null} className="boton-cuadro">                                
                                        <img 
                                            className={this.state.imageFile.file1 != null ? "menos-icon" :"suma-icon"} 
                                            alt="mas" 
                                            src={this.state.imageFile.file1 != null ? menos : simMas}>
                                        </img>
                                        <input onChange={this.handleChangeFile} style={this.state.imageFile.file1 != null ? {display: "none"} : null}  type="file" id="1" name="file1"></input>
                                    </legend>
                                    <img 
                                        alt="caraniño" 
                                        src={ this.state.imageFile.file1 != null ? this.state.imageFile.file1Url : caraBoy} 
                                        className={this.state.imageFile.file1 != null ? "foto-puesta" : "icono-foto"}>
                                    </img>                                 
                                </fieldset>
                                
                            </div>
                            <div className="p-2 sepa-derecho">
                                <fieldset className="cuadro">
                                    <legend onClick={this.state.imageFile.file2 != null ? (e) => this.handleRemoveImageService(e,2,"file2") : null} className="boton-cuadro">                                
                                        <img 
                                            className={this.state.imageFile.file2 != null ? "menos-icon" :"suma-icon"}
                                            src={this.state.imageFile.file2 != null ? menos : simMas} 
                                            alt="mas">                                            
                                        </img>
                                        <input onChange={this.handleChangeFile} style={this.state.imageFile.file2 != null ? {display: "none"} : null} type="file" id="2" name="file2"></input>
                                    </legend>
                                    <img 
                                        alt="caraniño" 
                                        src={ this.state.imageFile.file2 != null ? this.state.imageFile.file2Url : niña} 
                                        className={this.state.imageFile.file2 != null ? "foto-puesta" : "icono-foto"}>
                                    </img>                                    
                                </fieldset>
                                
                            </div>
                            <div className="p-2 sepa-derecho">
                                <fieldset className="cuadro">
                                    <legend onClick={this.state.imageFile.file3 != null ? (e) => this.handleRemoveImageService(e,3,"file3") : null} className="boton-cuadro">                                
                                        <img 
                                            className={this.state.imageFile.file3 != null ? "menos-icon" :"suma-icon"}
                                            src={this.state.imageFile.file3 != null ? menos : simMas} 
                                            alt="mas"
                                            >
                                        </img>
                                        <input onChange={this.handleChangeFile} style={this.state.imageFile.file3 != null ? {display: "none"} : null} type="file" id="3" name="file3"></input>
                                    </legend>
                                    <img 
                                        alt="caraniño" 
                                        src={ this.state.imageFile.file3 != null ? this.state.imageFile.file3Url : caraBoy} 
                                        className={this.state.imageFile.file3 != null ? "foto-puesta" : "icono-foto"}>
                                    </img>                                     
                                </fieldset>
                                
                            </div>
                            <div className="p-2">
                                <fieldset className="cuadro" >
                                    <legend onClick={this.state.imageFile.file4 != null ? (e) => this.handleRemoveImageService(e,4,"file4") : null} className="boton-cuadro">                                
                                        <img 
                                            className={this.state.imageFile.file4 != null ? "menos-icon" :"suma-icon"}
                                            src={this.state.imageFile.file4 != null ? menos : simMas} 
                                            alt="mas">                                                
                                        </img>
                                        <input onChange={this.handleChangeFile} style={this.state.imageFile.file4 != null ? {display: "none"} : null} type="file" id="4" name="file4"></input>                                                                            
                                    </legend>
                                    <img 
                                        alt="caraniño" 
                                        src={ this.state.imageFile.file4 != null ? this.state.imageFile.file4Url : niña} 
                                        className={this.state.imageFile.file4 != null ? "foto-puesta" : "icono-foto"}>
                                    </img>                                      
                                </fieldset>
                                
                            </div>
                        </div>
                    </div>
                    <div className="ml-5 error-message mb-2">{this.state.inputError.fileError}</div>
                    <div className="p-2 textoSercice espacio-iz">¿Que ofreces?</div>
                    <div className="p-2 d-flex justify-content-center">
                        <input onChange={this.handleChangeInput} value={this.state.form.title} type="text" className="forma-input " name="title" placeholder="Ej: Profesor de piano" />
                    </div>
                    <div className="ml-5 error-message mb-2">{this.state.inputError.titleError}</div>
                    <div className="p-2 textoSercice espacio-iz">Detalles</div>
                    <div className="p-2 d-flex justify-content-center">
                        <TextareaAutosize onChange={this.handleChangeInput} value={this.state.form.description} name="description" minRows={8} maxRows={8} className="forma-input" id="area-form" placeholder="Sigue esta estructura&#13;&#10;1. Presentación personal y biografía&#13;&#10;2. Formación en la materia&#13;&#10;3. Expereciencia en la materia"></TextareaAutosize>
                    </div>
                    <div className="ml-5 error-message mb-2">{this.state.inputError.descriptionError}</div>
                    <div className="p-2 textoSercice espacio-iz">Categoría</div>
                    <div className="p-2 d-flex justify-content-center">
                        <select onChange={this.handleChangeInput} value={this.state.form.category} name="category" className="forma-input" id="select-form">
                            <option defaultValue value="0">Selecciona una Categoría</option>
                            <option value="Babysitter">Babysitter</option>
                            <option value="Mascotas">Mascotas</option>
                            <option value="Profesores">Profesores</option>
                            <option value="Entrenadores">Entrenadores personales</option>
                            <option value="Limpieza">Limpieza</option>
                            <option value="Hogar">Hogar(reparaciones, reformas, etc)</option>
                            <option value="Otros">Otros</option>
                        </select>
                    </div>
                    <div className="ml-5 error-message mb-2">{this.state.inputError.categoryError}</div>
                    <div className="p-2 textoSercice espacio-iz">Precio por hora</div>
                    <div className="p-2 d-flex justify-content-center">
                        <input onChange={this.handleChangeInput} value={this.state.form.price} name="price" type="number" className="forma-input " placeholder="Euros"></input>
                    </div>
                    <div className="ml-5 error-message mb-2">{this.state.inputError.priceError}</div>
                    <div className="p-2 textoSercice espacio-iz">Lugar</div>
                    <div className="p-2 d-flex justify-content-center">
                        <input onChange={this.handleChangeInput} value={this.state.form.address} onBlur={this.vamos} name="address" type="text" className="forma-input " placeholder="Calle y numero"></input>
                    </div>
                    <div className="p-2 justify-content-center">
                            <div className="mapa-google">
                                <Map
                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${GOOGLE_API_KEY}`} 
                                    containerElement= {<div style={{height: '100%'}}/>}
                                    mapElement={<div style={{height: '100%',borderRadius:"25px"}} />}
                                    loadingElement={<div style={{ height: `100%` }}>Cargando</div>}
                                    zoom={15}
                                    center={{lat: this.state.form.latitude, lng: this.state.form.longitude }}
                                    form={this.state.form}
                                    onDragEnd={this.onMarkerDragEnd}
                                    draggable={true}
                                />                          
                            </div>
                    </div>
                    <div  className="p-2 centro-medio">
                        <button onClick={this.handleMyGeolocalitation} type="button"  className="textoSercice" id="buton-geo">Usar mi geolocalizacion<span><img alt="icon-geo" src={geomap}></img></span></button>
                    </div>
                    <div className="p-2 textoSercice espacio-iz mt-4">Disponibilidad</div>
                    <div className="p-2 centro-medio">
                        <div className="d-flex flex-row justify-content-center">
                            <div className="p-2">
                                <div className="textoSercice modify-texto-ser">L</div>
                            </div>
                            <div className="p-2">
                                <div className="textoSercice modify-texto-ser">M</div>
                            </div>
                            <div className="p-2">
                                <div className="textoSercice modify-texto-ser">X</div>
                            </div>
                            <div className="p-2">
                                <div className="textoSercice modify-texto-ser">J</div>
                            </div>
                            <div className="p-2">
                                <div className="textoSercice modify-texto-ser">V</div>
                            </div>
                            <div className="p-2">
                                <div className="textoSercice modify-texto-ser">S</div>
                            </div>
                            <div className="p-2">
                                <div className="textoSercice modify-texto-ser">D</div>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-center">
                            <label className="cuadro-check-box">                                
                                <input onChange={(e) => this.handleChangeCheckbox(e, this.state.monday)} checked={this.state.monday[0]} name="mor"  id="monday" type="checkbox" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">mañana</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <input onChange={(e) => this.handleChangeCheckbox(e, this.state.tuesday)} checked={this.state.tuesday[0]} name="mor" id="tuesday" type="checkbox" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">mañana</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input onChange={(e) => this.handleChangeCheckbox(e, this.state.wednesday)} checked={this.state.wednesday[0]} name="mor" id="wednesday" type="checkbox" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">mañana</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input onChange={(e) => this.handleChangeCheckbox(e, this.state.thursday)} checked={this.state.thursday[0]} name="mor" id="thursday" type="checkbox" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">mañana</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input onChange={(e) => this.handleChangeCheckbox(e, this.state.friday)} checked={this.state.friday[0]} name="mor" id="friday" type="checkbox" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">mañana</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input onChange={(e) => this.handleChangeCheckbox(e, this.state.saturday)} checked={this.state.saturday[0]} name="mor"  id="saturday" type="checkbox" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">mañana</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input onChange={(e) => this.handleChangeCheckbox(e, this.state.sunday)} checked={this.state.sunday[0]} name="mor" id="sunday" type="checkbox" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">mañana</div>
                            </label>                            
                        </div>

                        <div className="d-flex flex-row justify-content-center">
                            <label className="cuadro-check-box">                                
                                <input onChange={(e) => this.handleChangeCheckbox(e, this.state.monday)} checked={this.state.monday[1]} name="eve"  id="monday" type="checkbox" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">tarde</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <input onChange={(e) => this.handleChangeCheckbox(e, this.state.tuesday)} checked={this.state.tuesday[1]} name="eve" id="tuesday" type="checkbox" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">tarde</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input onChange={(e) => this.handleChangeCheckbox(e, this.state.wednesday)} checked={this.state.wednesday[1]} name="eve" id="wednesday" type="checkbox" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">tarde</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input onChange={(e) => this.handleChangeCheckbox(e, this.state.thursday)} checked={this.state.thursday[1]} name="eve" id="thursday" type="checkbox" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">tarde</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input onChange={(e) => this.handleChangeCheckbox(e, this.state.friday)} checked={this.state.friday[1]} name="eve" id="friday" type="checkbox" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">tarde</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input onChange={(e) => this.handleChangeCheckbox(e, this.state.saturday)} checked={this.state.saturday[1]} name="eve"  id="saturday" type="checkbox" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">tarde</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input onChange={(e) => this.handleChangeCheckbox(e, this.state.sunday)} checked={this.state.sunday[1]} name="eve" id="sunday" type="checkbox" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">tarde</div>
                            </label>                            
                        </div>
                    </div>
                    <div className="ml-5 error-message mb-2">{this.state.inputError.checkDayError}</div>
                    <div className="p-2 textoSercice espacio-iz mt-4" id="idioma">Idiomas(bilingue)</div>
                    <div className="p-2 centro-medio">
                        <div className="d-flex flex-row justify-content-center">
                            <label className="cuadro-check-box-bandera" >                                
                                <input checked={this.state.form.spanish} onChange={this.handleCheckContruy} name="spanish" type="checkbox" id="pais-spain" className="check-perso-box-bandera"></input>
                                <div className="texto-inside-check check-cua-bandera"><img alt="spain-icon" src={spain} className="icon-country"></img></div>
                            </label>

                            <label className="cuadro-check-box-bandera">                                
                                <input checked={this.state.form.english} onChange={this.handleCheckContruy} name="english" type="checkbox" id="pais-uss" className="check-perso-box-bandera"></input>
                                <div className="texto-inside-check check-cua-bandera"><img alt="spain-icon" src={uss} className="icon-country"></img></div>
                            </label>
                            
                            <label className="cuadro-check-box-bandera">                                
                                <input checked={this.state.form.french} onChange={this.handleCheckContruy} name="french" type="checkbox" id="pais-france" className="check-perso-box-bandera"></input>
                                <div className="texto-inside-check check-cua-bandera"><img alt="spain-icon" src={france} className="icon-country"></img></div>
                            </label>
                            
                            <label className="cuadro-check-box-bandera">                                
                                <input checked={this.state.form.italian} onChange={this.handleCheckContruy} name="italian" type="checkbox" id="pais-italy" className="check-perso-box-bandera"></input>
                                <div className="texto-inside-check check-cua-bandera"><img alt="spain-icon" src={italy} className="icon-country"></img></div>
                            </label>
                            
                            <label className="cuadro-check-box-bandera">                                
                                <input checked={this.state.form.german} onChange={this.handleCheckContruy} name="german" type="checkbox" id="pais-germany" className="check-perso-box-bandera"></input>
                                <div className="texto-inside-check check-cua-bandera"><img alt="spain-icon" src={germany} className="icon-country"></img></div>
                            </label>                      
                        </div>
                    </div>
                    <div className="ml-5 error-message mb-2">{this.state.inputError.checkCountryError}</div>
                    <div className="p-2 centro-medio">
                        {this.state.service_id != "" 
                        ?
                        <button type="submit" name="edit" className="btn-crear-serv">Guardar</button>
                        :
                        <button type="submit" name="crear" className="btn-crear-serv">Crear Servicio</button>
                        }                        
                    </div>
                </form>
            </div>
        )
    }
}

export default NewService;