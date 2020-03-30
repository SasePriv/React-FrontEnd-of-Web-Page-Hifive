import React, {Component} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Slider from "react-slick";
import Rating from 'react-star-review';
import { IoIosHeart } from 'react-icons/io';
import ReadMoreReact from 'read-more-react';
import { calculateAge } from './functions/calculateAge'

import './styles/newservice.css'
import './styles/verServicio.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
            datos: {},
            listaDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
            listaLenguage: ["spanish", "english", "french", "italian", "german"],
            listaCountry: [spain, uss, france, italy, germany]
        }

    }

    componentDidMount(){
        const { currentData } = this.props.location.state
        // console.log(currentData)
        this.setState({
            datos: currentData
        })


        
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

    generator_check_days = (day, tiempoDay, propDay ,datoServi) =>{
        
        if(datoServi[day] == 1){      
            if (datoServi[day+"_time"] == propDay) {
                return(
                    <label className="cuadro-check-box">                                
                        <div  id={day+"_"+propDay} name={day+"_"+propDay}  className="check-perso-box"></div>
                        <div className="texto-inside-check check-cua person-service-selected">{tiempoDay}</div>
                    </label>
                )      
            }else if(datoServi[day+"_time"] == "both"){
                return(
                    <label className="cuadro-check-box">                                
                        <div  id={day+"_both_"+propDay} name={day+"_both_"+propDay}  className="check-perso-box"></div>
                        <div className="texto-inside-check check-cua person-service-selected">{tiempoDay}</div>
                    </label>
                ) 
            }else{
                return(
                    <label className="cuadro-check-box">                                
                        <div className="check-perso-box"></div>
                        <div className="texto-inside-check check-cua person-service-no-selected">{tiempoDay}</div>
                    </label>
                )
            }      
                  
        }else{
            return(
                <label className="cuadro-check-box">                                
                    <div className="check-perso-box"></div>
                    <div className="texto-inside-check check-cua person-service-no-selected">{tiempoDay}</div>
                </label>
            )
        }
    }

    generador_check_lenCountry = (language, country ,datoServi) => {
        if (datoServi[language] == 1) {
            return(
                <label className="cuadro-check-box-bandera">                                
                    <div id={"pais-"+language} className="check-perso-box-bandera"></div>
                    <div className="texto-inside-check check-cua-bandera bandera-selected"><img alt={country+"-icon"} src={country} className="icon-country"></img></div>
                </label> 
                
            )
        } else {
            return(
                <label className="cuadro-check-box-bandera">                                
                    <div id={"pais-"+country} className="check-perso-box-bandera"></div>
                    <div className="texto-inside-check check-cua-bandera bandera-no-selected"><img alt={country+"-icon"} src={country} className="icon-country"></img></div>
                </label>  
            )
        }
    }


    render(){ 

        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        

        return(
            <div className="d-flex  p-out">
                <form className="flex-column" style={{width: "100%"}}>
                    <input type="hidden" id="serviceID" name="serviceID" value={this.state.datos.id} />
                    <input type="hidden" id="userID" name="userID" value={this.state.datos.user_id} /> 
                    <div className="p-2 centrar-text centrar headerTitulo" id="titulo-header">
                        {this.state.datos.userData?.name} · {(this.state.datos.userData?.date_birth != null) ? calculateAge(this.state.datos.userData?.date_birth)+ " años": "Sin Edad" } 
                    </div>                    
                    <div  className="p-2 image-ca">                
                        <Slider className="d-flex" {...settings}>
                            <div  className="image-ca">
                                <img className="caja-image" alt="imagen-servi" src={require('../assets/img/imagen-card1.jpg')}></img>
                            </div>
                            <div>
                                <img className="caja-image" alt="imagen-servi" src={require('../assets/img/imagen-card2.jpg')}></img>
                            </div>
                        </Slider>                       
                    </div>
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
                            <div className="p-2 ml-3">
                                
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
                    <div className="p-2 margen-izqui texto-dire">28109 Madrid</div>
                    <div className="p-2 justify-content-center">
                            <div className="mapa-google">
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
                            {this.state.listaDays.map( (currentDay) => {
                                return this.generator_check_days(currentDay, "mañana", "mor", this.state.datos)
                            })}                            
                        </div>

                        <div className="d-flex flex-row justify-content-center">
                            {this.state.listaDays.map( (currentDay) => {
                                return this.generator_check_days(currentDay, "tarde", "eve", this.state.datos)
                            })}                         
                        </div>
                    </div>
                    <div className="p-2 textoSercice espacio-iz mt-4 mini-sub-title">Idiomas</div>
                    <div className="p-2 centro-medio">
                        <div className="d-flex flex-row ml-4">
                            {this.state.listaLenguage.map( (currentCountry, index) => {
                                return this.generador_check_lenCountry(currentCountry, this.state.listaCountry[index] ,this.state.datos)
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
                                <Rating size="18px" filledColor="#ed8a19" borderColor="#ed8a19" rating={0} interactive onRatingChanged={(r) => console.log(r)}></Rating>
                            </div>
                        </div>
                        <div className="texto-dentro-valo">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                        </div>
                    </div>
                    <div className="p-2 texto-de-ver-mas">Ver más</div>
                    <div className="p-2 centro-medio">
                        <button className="btn-crear-serv">Chat</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default VerService;