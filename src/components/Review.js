import React, {Component} from 'react';
import './styles/review.css'
import Rating from 'react-star-review';
import TextareaAutosize from 'react-textarea-autosize';
import diploma from '../assets/svg/diploma.svg'
import relog from '../assets/svg/relog.svg'
import smile from '../assets/svg/smile.svg'

class Review extends Component{
    constructor(){
        super();
    }

    

    render(){ 
        return(
            <div className="d-flex fondo">
                <div className="flex-column carta">
                    <div className="p-2 sin-padding">
                        <img src={require('../assets/img/fondo-review.jpg')}></img>
                    </div>
                    <form className="p-2 card-style">
                        <div className="d-flex flex-row">
                            <div className="p-2 font-titulo">Valoración</div>
                        </div>
                        <div className="d-flex flex-row perfil">
                            <div className="p-2">
                                <img src={require('../assets/img/mask2.png')} alt="imagen-perfil-review"></img>
                            </div>
                            <div className="p-2 contenido">
                                <div className="header-name">Sara Lacour</div>
                                <div className="cargo">Babysitter</div>
                            </div>
                        </div>
                        <div className="d-flex flex-row star-perfil form-group">
                            <div className="p-2 separacion">
                                <img alt="icon" src={smile}></img>
                                <div className="texto-review">Feeling</div>
                            </div>
                            <div className="p-2">
                                <Rating filledColor="#ed8a19" borderColor="#ed8a19" rating={0} interactive onRatingChanged={(r) => console.log(r)}></Rating>
                            </div>
                        </div>
                        <div className="d-flex flex-row star-perfil star-2 form-group">
                            <div className="p-2 separacion sepa-2">
                                <img alt="icon" src={diploma}></img>
                                <div className="texto-review">Trabajo</div>
                            </div>
                            <div className="p-2">
                                 <Rating filledColor="#ed8a19" borderColor="#ed8a19" rating={0} interactive onRatingChanged={(r) => console.log(r)}></Rating>
                            </div>
                        </div>
                        <div className="d-flex flex-row star-perfil star-3 form-group">
                            <div className="p-2 separacion sepa-3">
                                <img alt="icon" src={relog}></img>
                                <div className="texto-review">Puntualidad</div>
                            </div>
                            <div className="p-2">
                                <Rating filledColor="#ed8a19" borderColor="#ed8a19" rating={0} interactive onRatingChanged={(r) => console.log(r)}></Rating>
                            </div>
                        </div>                        
                        <div id="sepa">
                            <div className="d-flex flex-row">
                                <div className="texto-review header-comen">
                                    Añade un comentario(opcional)
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-center">
                                <TextareaAutosize className="comentario" placeholder="Comentario"></TextareaAutosize>
                            </div>   
                            <div className="d-flex flex-row justify-content-center">
                                <button className="btn-valorar">Valorar</button>
                            </div>
                        </div>                    
                    </form>
                </div>
            </div>
        )
    }
}

export default Review;