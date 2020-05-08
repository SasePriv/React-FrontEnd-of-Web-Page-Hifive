/* eslint-disable eqeqeq */
import React, { Component } from 'react';
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
import spain from '../assets/svg/spain.svg'
import uss from '../assets/svg/uss.svg'
import germany from '../assets/svg/germany.svg'
import italy from '../assets/svg/italy.svg'
import france from '../assets/svg/france.svg'
import smile from '../assets/svg/smile-perfil.svg'

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
            url: "https://ec2-3-10-139-219.eu-west-2.compute.amazonaws.com/hifive-rest-api/public/serviceImages/",
            urlProfile: "https://ec2-3-10-139-219.eu-west-2.compute.amazonaws.com/hifive-rest-api/public/userProfileImages/",
            imageFirst: true,
            room_id: "",
            ver_mas_count: 1,
            redirect: false,
            favoCount: 0,
            redirecToChat: false,
            redirectModal: false
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
            await axios
            .post('/getSingleServices', { service_id })
            .then(res => {
            if (res.data.response) {
                this.setState({
                    datos: res.data.data,
                    user_service_id: res.data.data.user_id
                })
            }else{
                this.setState({
                    error: res.data.message,
                    redirectModal: true
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

    generador_reviews = () =>{
        const reviewsList = this.state.datos.reviews
        let arrayListReview = []

        if (reviewsList) {
            if (reviewsList.length != 0) {
                for (let index = 0; index < this.state.ver_mas_count && index < reviewsList.length; index++) {

                    let image_profile = reviewsList[index].reviewUser.userProfileImage
                    if (image_profile) {
                        image_profile = this.state.urlProfile+reviewsList[index].reviewUser.userProfileImage?.profile_image
                    }else{
                        image_profile = smile
                    }


                    arrayListReview.push(
                        <React.Fragment>
                            <div className="d-flex flex-row">
                                <div className="p-2">
                                    <div className="imagen-valorac">
                                        <img className={!reviewsList[index].reviewUser.userProfileImage? "smile-review": null} alt="imagen-perfil" src={image_profile}></img>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="titulo-valora">{reviewsList[index].reviewUser.name}</div>
                                    <Rating size={18} filledColor="#ed8a19" borderColor="#ed8a19" rating={parseInt(reviewsList[index].avg_rating)}></Rating>
                                </div>
                            </div>
                            <div className="texto-dentro-valo">
                            {reviewsList[index].comment}
                            </div>
                        </React.Fragment>
                    )

                }
            }  
        }
        
        return (
            <React.Fragment>
            {arrayListReview}
            {arrayListReview.length
            ?
                this.state.ver_mas_count == 1 
                ?
                    <div onClick={this.handleClickVermas} className="texto-de-ver-mas">Ver más</div>
                :
                    <div onClick={this.handleClickVermenos} className="texto-de-ver-mas">Ver menos</div>
                
            :
                null
            }
            
            
            </React.Fragment>
        )
    }

    handleClickVermas = (e) =>{
        e.preventDefault()
        this.setState({
            ver_mas_count: 9
        })
    }

    handleClickVermenos = (e) =>{
        e.preventDefault()
        this.setState({
            ver_mas_count: 1
        })
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
        let formData = new FormData()
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

    handleRedirectModal = () =>{
        this.setState({
            redirectModal: true
        })
    }

    handleFavorite = async () =>{

        let formdata = {
            by_user_id: this.state.user_id,
            service_id: this.state.service_id
        }

        try {
            await axios
            .post("/favouriteunfavourite", formdata)
            .then(res => {
                console.log(res.data)
                if (res.data.response) {
                    if (res.data.message == "you have successfully marked as fav") {
                        this.setState({
                            favoCount: this.state.favoCount + 1
                        })
                    }else{
                        this.setState({
                            favoCount: this.state.favoCount - 1
                        })
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    render(){ 

        if (this.state.redirectModal) {
            return (<Redirect to={{
              pathname: "/myprofile/",
              state: {status: true}
            }} />)
        }

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
            return (<Redirect to={{
                pathname:`/chat/${this.state.room_id}`,
                state: {
                    to_user_id: this.state.user_service_id
                }
        
            }} />)
        }
      

        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };        
        

        return(
            <div className="d-flex  p-out tamaño-window">
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
                                if (eachImage.type == "image") {
                                    return(
                                        <div className={this.state.imageFirst ? "image-ca" : null}>                                        
                                            <img className="caja-image" alt="imagen-servi" src={(this.state.url + eachImage.attachment)}></img>
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div className= "image-ca">      
                                            <video width="360" height="259" controls poster={eachImage.videoThumbnail}>
                                                <source src={(this.state.url+ eachImage.attachment)} type="video/mp4" />                            
                                            </video>                                          
                                        </div>
                                    )
                                }                                                                                         
                            } )}
                        </Slider> 
                        :
                        null
                    }
                    </div>
                    {  this.state.datos.serviceImage?.length == 1 
                    ?   
                        this.state.datos.serviceImage[0].type == "image" 
                        ?
                            <div className={this.state.imageFirst ? "image-ca" : null}>                        
                                <img className="caja-image" alt="imagen-servi" src={(this.state.url + this.state.datos.serviceImage[0].attachment)}></img>
                            </div>
                        :
                            <div className= "image-ca">      
                                <video width="360" height="259" controls poster={this.state.datos.serviceImage[0].videoThumbnail}>
                                    <source src={(this.state.url+ this.state.datos.serviceImage[0].attachment)} type="video/mp4" />                            
                                </video>                                          
                            </div>
                    :
                    null
                    }                
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
                            <div className="clikc-cora" onClick={this.handleFavorite}>
                                <IoIosHeart  className="estilo-cora"/>
                            </div>
                            <div className="counter-cora">
                                {this.state.datos.fav_count+this.state.favoCount}
                            </div>
                        </div>                        
                    </div>

                    

                    <div className="p-2 textoSercice espacio-iz mini-sub-title">¿Dónde?</div>
                    <div className="p-2 margen-izqui texto-dire">{this.state.datos.address}</div>
                    <div className="p-2 justify-content-center" >
                        <div className="mapa-google" style={this.state.isShowing ? {opacity: "0.5"}: null}>
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
                        <div className="d-flex flex-row justify-content-center texto-valo number-review">
                            <div className="p-2 puntualidad-numer" >4.2/5</div>
                            <div className="p-2 trabajo-number">4.2/5</div>
                            <div className="p-2 feeling-number">4.2/5</div>
                        </div>
                        <div className="d-flex flex-row justify-content-center texto-valo" style={{fontWeight: 500}}>
                            <div className="p-2 mt-1 mr-5">puntualidad </div>
                            <div className="p-2 mt-1 mr-5">trabajo </div>
                            <div className="p-2 mt-1 mr-5">feeling</div>
                        </div>
                    </div>
                    <div className="p-2 margen-izqui">
                        {this.generador_reviews()}
                    </div>                    
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
                        rediProfile={this.handleRedirectModal}
                    />                    
                    </div>                  
                </div>
            </div>
        )
    }
}

export default VerService;