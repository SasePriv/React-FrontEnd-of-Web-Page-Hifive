import React, {Component} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Slider from "react-slick";
import Rating from 'react-star-review';
import { IoIosHeart } from 'react-icons/io';

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
    constructor(){
        super();
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
                    <div className="p-2 centrar-text centrar headerTitulo" id="titulo-header">Sara Lacaour · 28 años</div>                    
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
                    <div className="p-2 titutlo-servi margen-izqui">Babysister</div>
                    <div className="p-2 margen-izqui precio-name">10 $/hora</div>
                    <div className="p-2 textoSercice espacio-iz resumen">
                    21 años. Hola soy Marta tengo 21 años. Soy una persona muy extrovertida, llevo 5 años trabajando con niños y me encanta estar con ellos. Soy una persona activa, asi que no se aburrirán conmigo, diversión asegurada! Estudio criminología en la...    <span className="subrayado">Leer más</span>
                    </div>
                    <div className="p-2">
                        <div className="d-flex flex-row justify-content-left">
                            <div className="p-2 ml-3">
                                <Rating size="18px" filledColor="#ed8a19" borderColor="#ed8a19" rating={0} interactive onRatingChanged={(r) => console.log(r)}></Rating>
                            </div>
                            <div className="p-2">
                                <div className="counter-star">30</div>
                            </div>
                            <div>
                                <IoIosHeart className="estilo-cora"/>
                            </div>
                            <div className="counter-cora">
                                27
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
                            <label className="cuadro-check-box">                                
                                <div  id="lunes-maña" name="lunes-maña"  className="check-perso-box"></div>
                                <div className="texto-inside-check check-cua person-service-no-selected">mañana</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <div  id="martes-maña" name="martes-maña"  className="check-perso-box"></div>
                                <div className="texto-inside-check check-cua person-service-no-selected">mañana</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <div  id="mierco-maña" name="mierco-maña"  className="check-perso-box"></div>
                                <div className="texto-inside-check check-cua person-service-selected">mañana</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <div  id="jueves-maña" name="jueves-maña"  className="check-perso-box"></div>
                                <div className="texto-inside-check check-cua person-service-selected">mañana</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <div  id="viernes-maña" name="viernes-maña"  className="check-perso-box"></div>
                                <div className="texto-inside-check check-cua person-service-no-selected">mañana</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <div  id="sabado-maña" name="sabado-maña"  className="check-perso-box"></div>
                                <div className="texto-inside-check check-cua person-service-no-selected">mañana</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <div  id="domingo-maña" name="domingo-maña"  className="check-perso-box"></div>
                                <div className="texto-inside-check check-cua person-service-no-selected">mañana</div>
                            </label>
                          
                        </div>

                        <div className="d-flex flex-row justify-content-center">

                            <label className="cuadro-check-box">                                
                                <div  id="lunes-tarde" name="lunes-tarde"  className="check-perso-box"></div>
                                <div className="texto-inside-check check-cua person-service-no-selected">mañana</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <div  id="martes-tarde" name="martes-tarde"  className="check-perso-box"></div>
                                <div className="texto-inside-check check-cua person-service-selected">mañana</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <div  id="mierco-tarde" name="mierco-tarde"  className="check-perso-box"></div>
                                <div className="texto-inside-check check-cua person-service-no-selected">mañana</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <div  id="jueves-tarde" name="jueves-tarde"  className="check-perso-box"></div>
                                <div className="texto-inside-check check-cua person-service-selected">mañana</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <div  id="viernes-tarde" name="viernes-tarde"  className="check-perso-box"></div>
                                <div className="texto-inside-check check-cua person-service-no-selected">mañana</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <div  id="sabado-tarde" name="sabado-tarde"  className="check-perso-box"></div>
                                <div className="texto-inside-check check-cua person-service-no-selected">mañana</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <div  id="domingo-tarde" name="domingo-tarde"  className="check-perso-box"></div>
                                <div className="texto-inside-check check-cua person-service-no-selected">mañana</div>
                            </label>
                         
                        </div>
                    </div>
                    <div className="p-2 textoSercice espacio-iz mt-4 mini-sub-title">Idiomas</div>
                    <div className="p-2 centro-medio">
                        <div className="d-flex flex-row ml-4">
                            <label className="cuadro-check-box-bandera">                                
                                <div id="pais-spain" className="check-perso-box-bandera"></div>
                                <div className="texto-inside-check check-cua-bandera bandera-selected"><img alt="spain-icon" src={spain} className="icon-country"></img></div>
                            </label>

                            <label className="cuadro-check-box-bandera">                                
                                <div  id="pais-uss" className="check-perso-box-bandera"></div>
                                <div className="texto-inside-check check-cua-bandera bandera-no-selected"><img alt="spain-icon" src={uss} className="icon-country"></img></div>
                            </label>
                            
                            <label className="cuadro-check-box-bandera">                                
                                <div id="pais-france" className="check-perso-box-bandera"></div>
                                <div className="texto-inside-check check-cua-bandera bandera-selected"><img alt="spain-icon" src={france} className="icon-country"></img></div>
                            </label>
                            
                            <label className="cuadro-check-box-bandera">                                
                                <div  id="pais-italy" className="check-perso-box-bandera"></div>
                                <div className="texto-inside-check check-cua-bandera bandera-selected"><img alt="spain-icon" src={italy} className="icon-country"></img></div>
                            </label>
                            
                            <label className="cuadro-check-box-bandera">                                
                                <div  id="pais-germany" className="check-perso-box-bandera"></div>
                                <div className="texto-inside-check check-cua-bandera bandera-no-selected"><img alt="spain-icon" src={germany} className="icon-country"></img></div>
                            </label>                       
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