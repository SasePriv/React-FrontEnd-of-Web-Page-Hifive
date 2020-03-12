import React from 'react';

import './styles/Modal.css';

const Modal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>Opciones</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <div className="eleccion">Cerrar Sesión</div>
                    <div  tabindex="1" className="eleccion eli">Eliminar mi cuenta permanentemente</div>
                </div>
                
                <button className="btn-confirmar-modal">Confirmar</button>

                    {/* <button className="btn-cancel" onClick={props.close}>CLOSE</button> */}
                
            </div>
        </div>
    )
}

export default Modal;