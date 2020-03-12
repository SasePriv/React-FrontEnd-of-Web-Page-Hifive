import React, {Component} from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import Rating from 'react-star-review';
import { IoIosHeart } from 'react-icons/io';
import Modal from './Modal'
import Bar from './Bar';
import smile from '../assets/svg/smile-perfil.svg'
import pencil from '../assets/svg/pencil.svg'
import './styles/myProfile.css'

class MyProfile extends Component{

  constructor(){
    super();
    this.state = {
      isShowing: false

    }
  }

  openModalHandler = () => {
    this.setState({
        isShowing: true
    });
  }

  closeModalHandler = () => {
      this.setState({
          isShowing: false
      });
  }


  generadorPerfil(){
    if(true){
    return (
          <div>
          <div className="p-2 p-out caja-perfil ">
            <div className="lapiz"><img src={pencil}></img></div>
            <div className="d-flex justify-content-center">
              <div className="circulo-foto"><img className="centro-imagen-circulo" alt="profile-iamge" src={smile}></img></div>              
            </div>
            <div className="medio">Sara Lacaour · 28 años</div>
          </div>

         

          <div className="p-2 centrar vamos">¡Vamos, crea tu primer servicio! </div>
          <button className="crear-servi">Crear servicio </button>

{/* 
          <div className="p-2 titutlo-servi margen-izqui change-tama">Babysister</div>
          <div className="p-2 margen-izqui precio-name change-tama2">10 $/hora</div>
          <div className="p-2 textoSercice espacio-iz resumen change-tama2">
          21 años. Hola soy Marta tengo 21 años. Soy una persona muy extrovertida, llevo 5 años trabajando con niños y me encanta estar con ellos. Soy una persona act...
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
                  <button className="buton-desactivar">Activar</button>
              </div>                        
          </div>

          <div className="p-2 titutlo-servi margen-izqui change-tama">Babysister</div>
          <div className="p-2 margen-izqui precio-name change-tama2">10 $/hora</div>
          <div className="p-2 textoSercice espacio-iz resumen change-tama2">
          21 años. Hola soy Marta tengo 21 años. Soy una persona muy extrovertida, llevo 5 años trabajando con niños y me encanta estar con ellos. Soy una persona act...
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

                  <button className="buton-activar">Activar</button>
              </div>                        
          </div> */}

          </div>
      )
  }
}

  render(){


    return (
      <div className="d-flex flex-column p-out">

          <div className="p-2 d-flex caja-titulo-perfil">
            <div className="centrar ti-perf fin-title ">Editar mi perfil</div>
            {/* <div className="ti-perf"><FaEllipsisV className="click-mode" onClick={this.openModalHandler} /></div> */}
          </div>
          
          <div className="p-2 editar-caja-perfil ">
            <div className="d-flex justify-content-center p-out">
              <div className="editar-circulo-foto"><img className="centro-imagen-editar" alt="profile-iamge" src={require('../assets/img/imagen-card1.jpg')}></img></div>              
            </div>
            <div className="medio type-letra">Cambiar Foto</div>
          </div>
          
          <form className="p-2">
            <div className="form-group">
              <label className="ne-linea label-titulos ml-4 pl-2">Mi nombre</label>
              <input className="entrada-input-button" type="text" id="name" name="name"></input>
            </div>
            <div className="form-group">
              <label className="ne-linea label-titulos ml-4 pl-2">Mi año de nacimiento</label>
              <input className="entrada-input-button" type="number" min="1945" max="2019" id="year" placeholder="1645"></input>
            </div>
            <div className="form-group">
              <button className="buton-crear-servi">Guardar</button>
            </div>
          </form>


          { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

          {/* <div className="">          
          <Modal
              show={this.state.isShowing}
              close={this.closeModalHandler}>
          </Modal>
          </div> */}
          

          {/* <Bar></Bar> */}
      </div>
    );
  }
 
}

export default MyProfile;