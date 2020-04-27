import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Slider from "react-slick";
import Rating from 'react-star-review';
import { IoIosHeart } from 'react-icons/io';
import ReadMoreReact from 'read-more-react';
import { Redirect, Link} from 'react-router-dom'
import ModalService from './modals/ModalService'
import { calculateAge } from './functions/calculateAge'
import axios from 'axios'
import ArrowBack from './ArrowBack'
import Map from './Map'
import { GOOGLE_API_KEY } from '../googleApiKey.js'

import './styles/newservice.css'
import './styles/verServicio.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import papelera from '../assets/svg/papelera.svg'
import caraBoy from '../assets/svg/cara-boy.svg'
import niña from '../assets/svg/niña.svg'
import simMas from '../assets/svg/mas.svg'
import geomap from '../assets/svg/geo.svg'
import spain from '../assets/svg/spain.svg'
import uss from '../assets/svg/uss.svg'
import germany from '../assets/svg/germany.svg'
import italy from '../assets/svg/italy.svg'
import france from '../assets/svg/france.svg'

class VerService extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: "",
            user_service_id: "",
            service_id: "",
            datos: {},
            listaDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
            listaLenguage: ["spanish", "english", "french", "italian", "german"],
            listaCountry: [spain, uss, france, italy, germany],
            error: "",
            edit: false,
            isShowing: false,
            hide: "none",
            url: "https://hifive.es/hifive-rest-api/public/serviceImages/",
            imageFirst: true,
            room_id: "",
            redirect: false,
            redirecToChat: false,
        }
    }

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

          const idservice  = this.props.match.params.id

            this.setState({
                service_id: idservice
            })

        //    if (datosStorage.id == currentData.user_id) {
        //        this.setState({
        //            edit: true
        //        })
        //    } 
        }
      }

    async componentDidMount(){
       await this.fetchInfoServices()
    }

    fetchInfoServices = async () => {

        const service_id = this.state.service_id

        try {
            axios
            .post('/getSingleServices', { service_id })
            .then(res => {
            if (res.data.response) {
                this.setState({
                datos: res.data.data,
                user_service_id: res.data.data.user_id
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

    calculate_age = (dob1) => {
        var today = new Date();
        var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age_now--;
        }
        // console.log(age_now);
        return age_now;
    }

    generator_check_days = (day, tiempoDay, propDay ,datoServi, index) =>{
        
        if(datoServi[day] == 1){      
            if (datoServi[day+"_time"] == propDay) {
                return(
                    <label className="cuadro-check-box" key={index}>                                
                        <div  id={day+"_"+propDay} name={day+"_"+propDay}  className="check-perso-box"></div>
                        <div className="texto-inside-check check-cua person-service-selected">{tiempoDay}</div>
                    </label>
                )      
            }else if(datoServi[day+"_time"] == "both"){
                return(
                    <label className="cuadro-check-box" key={index}>                                
                        <div  id={day+"_both_"+propDay} name={day+"_both_"+propDay}  className="check-perso-box"></div>
                        <div className="texto-inside-check check-cua person-service-selected">{tiempoDay}</div>
                    </label>
                ) 
            }else{
                return(
                    <label className="cuadro-check-box" key={index}>                                
                        <div className="check-perso-box"></div>
                        <div className="texto-inside-check check-cua person-service-no-selected">{tiempoDay}</div>
                    </label>
                )
            }      
                  
        }else{
            return(
                <label className="cuadro-check-box" key={index}>                                
                    <div className="check-perso-box"></div>
                    <div className="texto-inside-check check-cua person-service-no-selected">{tiempoDay}</div>
                </label>
            )
        }
    }

    generador_check_lenCountry = (language, country ,datoServi, index) => {
        if (datoServi[language] == 1) {
            return(
                <label className="cuadro-check-box-bandera" key={index}>                                
                    <div id={"pais-"+language} className="check-perso-box-bandera"></div>
                    <div className="texto-inside-check check-cua-bandera bandera-selected"><img alt={country+"-icon"} src={country} className="icon-country"></img></div>
                </label> 
                
            )
        } else {
            return(
                <label className="cuadro-check-box-bandera" key={index}>                                
                    <div id={"pais-"+country} className="check-perso-box-bandera"></div>
                    <div className="texto-inside-check check-cua-bandera bandera-no-selected"><img alt={country+"-icon"} src={country} className="icon-country"></img></div>
                </label>  
            )
        }
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false,
            hide: "none"
        });
    }

    generadorTitulo = (datos) => {
        if (!this.state.edit) {
            if (datos.userData?.date_birth != null) {
                return " · "+calculateAge(datos.userData?.date_birth)+ " años"
            } else {
                return " · Sin Edad"
            }
        }
    }

    arrowBackButton = () =>{
        this.props.history.goBack()
    }

    handleButtonChat = async () =>{
        let formData = new FormData
        formData.append("user_id",this.state.user_id)
        formData.append("service_id", this.state.service_id)
        formData.append("to_user_id", this.state.user_service_id)

        try {
            await axios 
            .post("/create_chat_room", formData)
            .then(res =>{
                if (res.data.response) {
                    console.log(res)
                    this.setState({
                        redirecToChat: true,
                        room_id: res.data.data.room_id
                    })
                }else{
                    console.log("error del server")
                    console.log(res)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    openModalHandler = () => {
        this.setState({
            isShowing: true,
            hide: ""
        });
    }

    render(){ 

        if (!this.state.edit) {
            if (this.state.user_id == this.state.datos.user_id) {
                this.setState({
                    edit: true
                })
            }  
        }

        if (this.state.redirect) {
            return (<Redirect to="/login" />)
        }

        if (this.state.redirecToChat) {
            return (<Redirect to={`/chat/${this.state.room_id}`} />)
        }
      

        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };        

        return(
            <div className="d-flex  p-out">
                <div className="flex-column" style={{width: "100%"}}>
                    { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

                    <div className="p-2">
                        <div onClick={this.arrowBackButton}><ArrowBack /></div>
                        {this.state.edit ? <div onClick={this.openModalHandler} className="papelera"><img alt="papelera" src={papelera} /></div>: null }                         
                        <div className="centrar-text centrar headerTitulo" id="titulo-header">
                            {/* {this.state.datos.userData?.name+" "}  */}
                            {this.state.edit ? "Editar servicio": this.state.datos.userData?.name}
                            {this.generadorTitulo(this.state.datos)}
                        </div>                                         
                    </div>
                    
                    <div className="p-2 image-ca" style={ this.state.isShowing ? {opacity: "0.5"} : null}>   
                    {  this.state.datos.serviceImage?.length > 1 ?                                 
                        <Slider className="d-flex" {...settings}>                            
                            {this.state.datos.serviceImage?.map( (eachImage) =>{    
                                this.setState({imageFirst: false})                            
                                return(
                                    <div className={this.state.imageFirst ? "image-ca" : null}>                                        
                                        <img className="caja-image" alt="imagen-servi" src={(this.state.url + eachImage.attachment)}></img>
                                    </div>
                                )
                            } )}
                        </Slider> 
                        :
                        null
                    }
                    </div>
                    {  this.state.datos.serviceImage?.length == 1 ? 
                    <div className={this.state.imageFirst ? "image-ca" : null}>                        
                        <img className="caja-image" alt="imagen-servi" src={(this.state.url + this.state.datos.serviceImage[0].attachment)}></img>
                    </div>
                    : null}

                    <div className="p-2 titutlo-servi margen-izqui">{this.state.datos.title}</div>
                    <div className="p-2 margen-izqui precio-name">{this.state.datos.price} $/hora</div>
                    <div className="p-2 textoSercice espacio-iz resumen">


                    {this.state.datos.description != undefined && <ReadMoreReact 
                        text={this.state.datos.description}
                        min={150}
                        ideal={200}
                        max={300}
                        readMoreText={"Leer Mas"}
                    />}

                    </div>
                    <div className="p-2">
                        <div className="d-flex flex-row justify-content-left">
                            <div className="p-2 ml-3" style={ this.state.isShowing ? {opacity: "0.5"} : null}>
                                
                                {/* Star Reviwe component */}

                                {this.state.datos.avg_rating != undefined && 
                                <Rating 
                                    size={18}
                                    filledColor="#ed8a19" 
                                    borderColor="#ed8a19" 
                                    rating={this.state.datos.avg_rating}
                                /> }

                            </div>
                            <div className="p-2">
                                <div className="counter-star">{this.state.datos.avg_rating}</div>
                            </div>
                            <div>
                                <IoIosHeart className="estilo-cora"/>
                            </div>
                            <div className="counter-cora">
                                {this.state.datos.fav_count}
                            </div>
                        </div>                        
                    </div>

                    

                    <div className="p-2 textoSercice espacio-iz mini-sub-title">¿Dónde?</div>
                    <div className="p-2 margen-izqui texto-dire">{this.state.datos.address}</div>
                    <div className="p-2 justify-content-center">
                        <div className="mapa-google">
                            {this.state.datos.latitude 
                            ?
                            <Map
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${GOOGLE_API_KEY}`} 
                                containerElement= {<div style={{height: '100%'}}/>}
                                mapElement={<div style={{height: '100%',borderRadius:"25px"}} />}
                                loadingElement={<div style={{ height: `100%` }}>Cargando</div>}
                                zoom={15}
                                center={{lat: this.state.datos.latitude , lng: this.state.datos.longitude }}
                                form={this.state.datos}
                                onDragEnd={() => {}}
                                draggable={false}
                            /> 
                            :
                            null
                            }
                            
                        </div>
                    </div>
                    <div className="p-2 textoSercice espacio-iz mt-4 mini-sub-title">¿Cuándo?</div>
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
                            {this.state.listaDays.map( (currentDay, index) => {
                                return this.generator_check_days(currentDay, "mañana", "mor", this.state.datos, index)
                            })}                            
                        </div>

                        <div className="d-flex flex-row justify-content-center">
                            {this.state.listaDays.map( (currentDay, index) => {
                                return this.generator_check_days(currentDay, "tarde", "eve", this.state.datos, index)
                            })}                         
                        </div>
                    </div>
                    <div className="p-2 textoSercice espacio-iz mt-4 mini-sub-title">Idiomas</div>
                    <div className="p-2 centro-medio">
                        <div className="d-flex flex-row ml-4">
                            {this.state.listaLenguage.map( (currentCountry, index) => {
                                return this.generador_check_lenCountry(currentCountry, this.state.listaCountry[index] ,this.state.datos, index)
                            } )}                      
                        </div>
                    </div>
                    <div className="p-2 textoSercice espacio-iz mt-3 mini-sub-title">Valoraciones</div>
                    <div className="p-2 ">
                        <div className="d-flex flex-row justify-content-center texto-valo">
                            <div className="p-2 mr-5" >4.2/5</div>
                            <div className="p-2 ml-2 mr-4">4.2/5</div>
                            <div className="p-2 ml-2">4.2/5</div>
                        </div>
                        <div className="d-flex flex-row justify-content-center texto-valo" style={{fontWeight: 500}}>
                            <div className="p-2 mr-4">puntualidad </div>
                            <div className="p-2 mr-4">trabajo </div>
                            <div className="p-2 mr-4">feeling</div>
                        </div>
                    </div>
                    <div className="p-2 margen-izqui">
                        <div className="d-flex flex-row">
                            <div className="p-2">
                                <img className="imagen-valorac" alt="imagen-perfil" src={require('../assets/img/imagen-card2.jpg')}></img>
                            </div>
                            <div className="p-2">
                                <div className="titulo-valora">Jannie Sky</div>
                                <Rating size={18} filledColor="#ed8a19" borderColor="#ed8a19" rating={0}></Rating>
                            </div>
                        </div>
                        <div className="texto-dentro-valo">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                        </div>
                    </div>
                    <div className="p-2 texto-de-ver-mas">Ver más</div>
                    <div className="p-2 centro-medio">
                        {this.state.edit ? 
                        <Link to={"/editservice/"+this.state.datos.id}><button className="btn-crear-serv">Editar servicio</button></Link> 
                        : 
                        <button onClick={this.handleButtonChat} className="btn-crear-serv">Chat</button>
                        }
                    </div>  

                    <div style={{display: this.state.hide}}>

                    {/* Arreglar los botones de aqui, el de eliminar si sirve  */}
                    <ModalService
                        show={this.state.isShowing}
                        close={this.closeModalHandler}
                        serviceId={this.state.service_id}
                        status={this.state.datos.status}
                    />                    
                    </div>                  
                </div>
            </div>
        )
    }
}

export default VerService;