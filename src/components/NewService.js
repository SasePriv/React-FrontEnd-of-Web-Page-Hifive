import React, {Component} from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import './styles/newservice.css'
import caraBoy from '../assets/svg/cara-boy.svg'
import niña from '../assets/svg/niña.svg'
import simMas from '../assets/svg/mas.svg'
import geomap from '../assets/svg/geo.svg'
import spain from '../assets/svg/spain.svg'
import uss from '../assets/svg/uss.svg'
import germany from '../assets/svg/germany.svg'
import italy from '../assets/svg/italy.svg'
import france from '../assets/svg/france.svg'

class NewService extends Component{
    constructor(){
        super();
    }

    render(){ 
        return(
            <div className="d-flex  p-out">
                <form className="flex-column" style={{width: "100%"}}>
                    <div className="p-2 centrar-text centrar headerTitulo" id="titulo-header">Nuevo Servicio</div>
                    <div  className="p-2 textoSercice" id="titulo-foto">Fotos/videos</div>
                    <div className="p-2">
                        <div className="d-flex flex-row justify-content-center">
                            <div className="p-2 sepa-derecho">
                                <fieldset className="cuadro">
                                    <legend className="boton-cuadro">                                
                                        <img className="suma-icon" alt="mas" src={simMas}></img>
                                        <input type="file"></input>
                                    </legend>
                                    <img alt="caraniño" src={caraBoy} className="icono-foto"></img>                                    
                                </fieldset>
                                
                            </div>
                            <div className="p-2 sepa-derecho">
                                <fieldset className="cuadro">
                                    <legend className="boton-cuadro">                                
                                        <img className="suma-icon" alt="mas" src={simMas}></img>
                                        <input type="file"></input>
                                    </legend>
                                    <img alt="caraniño" src={niña} className="icono-foto"></img>                                    
                                </fieldset>
                                
                            </div>
                            <div className="p-2 sepa-derecho">
                                <fieldset className="cuadro">
                                    <legend className="boton-cuadro">                                
                                        <img className="suma-icon" alt="mas" src={simMas}></img>
                                        <input type="file"></input>
                                    </legend>
                                    <img alt="caraniño" src={caraBoy} className="icono-foto"></img>                                    
                                </fieldset>
                                
                            </div>
                            <div className="p-2">
                                <fieldset className="cuadro">
                                    <legend className="boton-cuadro">                                
                                        <img className="suma-icon" alt="mas" src={simMas}></img>
                                        <input type="file"></input>
                                    </legend>
                                    <img alt="caraniño" src={niña} className="icono-foto"></img>                                    
                                </fieldset>
                                
                            </div>
                        </div>
                    </div>
                    <div className="p-2 textoSercice espacio-iz">¿Que ofreces?</div>
                    <div className="p-2 d-flex justify-content-center">
                        <input type="text" className="forma-input " placeholder="Ej: Profesor de piano"></input>
                    </div>
                    <div className="p-2 textoSercice espacio-iz">Detalles</div>
                    <div className="p-2 d-flex justify-content-center">
                        <TextareaAutosize minRows={8} maxRows={8} className="forma-input" id="area-form" placeholder="Sigue esta estructura&#13;&#10;1. Presentación personal y biografía&#13;&#10;2. Formación en la materia&#13;&#10;3. Expereciencia en la materia"></TextareaAutosize>
                    </div>
                    <div className="p-2 textoSercice espacio-iz">Categoría</div>
                    <div className="p-2 d-flex justify-content-center">
                        <select name="categoria-select" className="forma-input" id="select-form">
                            <option selected value="0">Selecciona una Categoría</option>
                            <option value="1">Babysitter</option>
                            <option value="2">Mascotas</option>
                            <option value="3">Profesores</option>
                            <option value="4">Entrenadores personales</option>
                            <option value="5">Limpieza</option>
                            <option value="6">Hogar(reparaciones, reformas, etc)</option>
                            <option value="7">Otros</option>
                        </select>
                    </div>
                    <div className="p-2 textoSercice espacio-iz">Precio por hora</div>
                    <div className="p-2 d-flex justify-content-center">
                        <input type="text" className="forma-input " placeholder="Euros"></input>
                    </div>
                    <div className="p-2 textoSercice espacio-iz">Lugar</div>
                    <div className="p-2 d-flex justify-content-center">
                        <input type="text" className="forma-input " placeholder="Calle y numero"></input>
                    </div>
                    <div className="p-2 justify-content-center">
                            <div className="mapa-google">
                            </div>
                    </div>
                    <div  className="p-2 centro-medio">
                        <button className="textoSercice" id="buton-geo">Usar mi geolocalizacion<span><img alt="icon-geo" src={geomap}></img></span></button>
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
                                <input type="checkbox" id="lunes-maña" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">mañana</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <input type="checkbox" id="martes-maña" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">mañana</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input type="checkbox" id="miercoles-maña" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">mañana</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input type="checkbox" id="jueves-maña" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">mañana</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input type="checkbox" id="viernes-maña" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">mañana</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input type="checkbox" id="sabado-maña" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">mañana</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input type="checkbox" id="domingo-maña" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">mañana</div>
                            </label>                            
                        </div>

                        <div className="d-flex flex-row justify-content-center">
                            <label className="cuadro-check-box">                                
                                <input type="checkbox" id="lunes-tarde" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">tarde</div>
                            </label>

                            <label className="cuadro-check-box">                                
                                <input type="checkbox" id="martes-tarde" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">tarde</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input type="checkbox" id="miercoles-tarde" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">tarde</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input type="checkbox" id="jueves-tarde" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">tarde</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input type="checkbox" id="viernes-tarde" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">tarde</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input type="checkbox" id="sabado-tarde" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">tarde</div>
                            </label>
                            
                            <label className="cuadro-check-box">                                
                                <input type="checkbox" id="domingo-tarde" className="check-perso-box"></input>
                                <div className="texto-inside-check check-cua">tarde</div>
                            </label>                            
                        </div>
                    </div>
                    <div className="p-2 textoSercice espacio-iz mt-4" id="idioma">Idiomas(bilingue)</div>
                    <div className="p-2 centro-medio">
                        <div className="d-flex flex-row justify-content-center">
                            <label className="cuadro-check-box-bandera">                                
                                <input type="checkbox" id="pais-spain" className="check-perso-box-bandera"></input>
                                <div className="texto-inside-check check-cua-bandera"><img alt="spain-icon" src={spain} className="icon-country"></img></div>
                            </label>

                            <label className="cuadro-check-box-bandera">                                
                                <input type="checkbox" id="pais-uss" className="check-perso-box-bandera"></input>
                                <div className="texto-inside-check check-cua-bandera"><img alt="spain-icon" src={uss} className="icon-country"></img></div>
                            </label>
                            
                            <label className="cuadro-check-box-bandera">                                
                                <input type="checkbox" id="pais-france" className="check-perso-box-bandera"></input>
                                <div className="texto-inside-check check-cua-bandera"><img alt="spain-icon" src={france} className="icon-country"></img></div>
                            </label>
                            
                            <label className="cuadro-check-box-bandera">                                
                                <input type="checkbox" id="pais-italy" className="check-perso-box-bandera"></input>
                                <div className="texto-inside-check check-cua-bandera"><img alt="spain-icon" src={italy} className="icon-country"></img></div>
                            </label>
                            
                            <label className="cuadro-check-box-bandera">                                
                                <input type="checkbox" id="pais-germany" className="check-perso-box-bandera"></input>
                                <div className="texto-inside-check check-cua-bandera"><img alt="spain-icon" src={germany} className="icon-country"></img></div>
                            </label>                      
                        </div>
                    </div>
                    <div className="p-2 centro-medio">
                        <button className="btn-crear-serv">Crear Servicio</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewService;