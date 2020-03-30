import React, {Component} from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import Rating from 'react-star-review';
import { IoIosHeart } from 'react-icons/io';
import { calculateAge } from './functions/calculateAge'
import Modal from './Modal'
import Bar from './Bar';
import axios from 'axios'
import smile from '../assets/svg/smile-perfil.svg'
import pencil from '../assets/svg/pencil.svg'
import './styles/myProfile.css'

class MyProfile extends Component{

  constructor(){
    super();
    this.state = {
      datos: {},
      servicios: [],
      isShowing: false,
      hide: "none",
      redirect: false,
      error: ''
    }
  }

  UNSAFE_componentWillMount = () =>{
    if (!sessionStorage.getItem("userData")) {
      this.setState({
          redirect: true
      })
    }else{

      this.setState({
        datos: JSON.parse(sessionStorage.getItem('userData'))
      })
    }
  }


  async componentDidMount(){
    this.fetchInfoServices()
  }

  fetchInfoServices = async () => {

    const user_id = this.state.datos.id

    try {
        axios
      .post('http://localhost:3008/viewAnotherServices', { user_id })
      .then(res => {
        if (res.data.response) {
          this.setState({
            servicios: res.data.data
          })
        }else{
          this.setState({
            error: res.message
          })
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

  closeModalHandler = () => {
      this.setState({
          isShowing: false,
          hide: "none"
      });
  }


  generadorPerfil(data){
    if(true){
      return (
            <div>
              <div className="p-2 d-flex caja-titulo-perfil">
                <div className="centrar ti-perf fin-title ">Mi perfil</div>
                <div className="ti-perf"><FaEllipsisV className="click-mode" onClick={this.openModalHandler} /></div>
              </div>
              <div className="p-2 p-out caja-perfil ">
                <div className="lapiz"><img alt="pencil" src={pencil}></img></div>
                <div className="d-flex justify-content-center">
                  <div className="circulo-foto"><img className="centro-imagen-circulo" alt="profile-iamge" src={smile}></img></div>              
                </div>
                <div className="medio">
                  {this.state.datos.name} · {(this.state.datos.date_birth != null) ? calculateAge(this.state.datos.date_birth) + " años": "Sin Edad" } 
                </div>
              </div>

              {/* <div className="p-2 centrar vamos">¡Vamos, crea tu primer servicio! </div> */}
              
              <button className="buton-crear-servi">Crear servicio </button>

              <div className="container content-scroll">
                {
                 
                (this.state.servicios.length != 0) 
                ? 
                data.map( (ser) => {return(this.eachService(ser))})
                :
                <div className="p-2 centrar vamos">¡Vamos, crea tu primer servicio! </div>
              
                }             
              </div>


            </div>
      )
    }
  }

  eachService = (each) =>{
    return(
      <React.Fragment>
        <input type="hidden" id="serviceID" name="serviceID" value={each.id} />
        <div className="p-2 titutlo-servi margen-izqui change-tama">{each.title}</div>
        <div className="p-2 margen-izqui precio-name change-tama2">{each.price} $/hora</div>
        <div className="p-2 textoSercice espacio-iz resumen change-tama2">
          {this.shortText(each.description)}
        </div>
        <div className="p-2">
            <div className="d-flex flex-row justify-content-left">
                <div className="p-2 ml-3">
                    <Rating size="18px" filledColor="#ed8a19" borderColor="#ed8a19" rating={each.avg_rating} interactive onRatingChanged={(r) => console.log(r)}></Rating>
                </div>
                <div className="p-2">
                    <div className="counter-star">{each.avg_rating}</div>
                </div>
                <div>
                    <IoIosHeart className="estilo-cora"/>
                </div>
                <div className="counter-cora">
                    {each.fav_count}
                </div>
                
                <button className={(each.status == "active") ? "buton-activar": "buton-desactivar"}>Activar</button>
            </div>                        
        </div>
      </React.Fragment>
    )
  }

  shortText = (text) =>{
    if(text.length > 157){
      return text.substring(0,157)+'...'
    }else{
      return text
    }
  }

  generadorEditPerfil = () =>{
    return(
    <React.Fragment>
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
    </React.Fragment>
    )
  }

  render(){

    return (
      <div className="d-flex flex-column p-out">

          {this.generadorPerfil(this.state.servicios)}


          { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

          <div style={{display: this.state.hide}}>          
          <Modal
              show={this.state.isShowing}
              close={this.closeModalHandler}>
          </Modal>
          </div>
          

          <Bar></Bar>
      </div>
    );
  }
 
}

export default MyProfile;