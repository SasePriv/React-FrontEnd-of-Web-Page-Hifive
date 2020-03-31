import React from 'react';
import './styles/arrowback.css'
import flecha from '../assets/svg/flecha.svg'

function ArrowBack(){
    return(
        <div className="arrow-back"><img src={flecha} alt="boton-flecha"/></div>
    )
}

export default ArrowBack;