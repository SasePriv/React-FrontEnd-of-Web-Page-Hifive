import React, {Component} from 'react';
import { FaEllipsisV, FaRegHandScissors } from 'react-icons/fa';
import Rating from 'react-star-review';
import { IoIosHeart } from 'react-icons/io';
import { calculateAge } from './functions/calculateAge'
import Modal from './modals/Modal'
import Bar from './Bar';
import axios from 'axios'
import ArrowBack from './ArrowBack'
import { Redirect, Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect';

import smile from '../assets/svg/smile-perfil.svg'
import pencil from '../assets/svg/pencil.svg'

import './styles/myProfile.css'

class MyProfile extends Component{

  constructor(){
    super();
    this.state = {
      user_id: "",
      file_url: null,
      file: null,
      datos: {},
      servicios: [],
      isShowing: false,
      isShowingButton: false,
      hide: "none",
      redirect: false,
      error: '',
      form: {
        name: "",
        date_birth: ""
      },
      editShowing: false,
      sucesMessage: "",
      url: "https://hifive.es/hifive-rest-api/public/userProfileImages/",
      progress: "",
      progress_status: "none",
      change: ""
    }
  }

  UNSAFE_componentWillMount = () =>{
    console.log(sessionStorage.getItem("userData"))
    if (!sessionStorage.getItem("userData")) {
      this.setState({
          redirect: true
      })
    }else{
      const idUser = JSON.parse(sessionStorage.getItem('userData'))
      this.setState({
        user_id: idUser.id
      })
    }
  }


  async componentDidMount(){
    this.fetchInfoServices()
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.location.status !== this.state.change) {
      this.fetchInfoServices()
    }
  }

  fetchInfoServices = async () => {

    const user_id = this.state.user_id

    try {
      await  axios
      .post('/getUserDetails', { user_id })
      .then(res => {
        if (res.data.response) {
          this.setState({
            datos: res.data.data,
            servicios: res.data.data.userServices,
            form: {
              name: res.data.data.name,
              date_birth: res.data.data.date_birth
            }
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

  handleSubmitEdit = async (e) =>{
    e.preventDefault()

    if (this.state.file) {
      this.handleUploadImage()
    }

    const user_id = this.state.user_id
    const name = this.state.form.name
    const date_birth = this.state.form.date_birth

    try {
      axios
      .post('/editUser', { user_id, name, date_birth })
      .then(res => {
        if (res.data.response) {
          this.setState({
            editShowing: false
          })          
          this.fetchInfoServices()
        }else{
          this.setState({
            error: res.message
          })
        }
      })
    }catch (error) {
      console.log(error)
    }

  }

  handleUploadImage = async () =>{
    let data = new FormData

    const file = this.state.file
    const user_id = this.state.user_id

    data.append('profile_image', file)

    try {
      await axios
        .post('/addUserImage/'+user_id, data , {
            onUploadProgress: progressEvent =>{
              this.setState({
                progress_status: "unset",
                progress: Math.round(progressEvent.loaded / progressEvent.total *100)                
              })
            }
        })
        .then(res => {
          console.log(res)
          this.fetchInfoServices()
        })
    } catch (error) {
      console.log(error)
    }
  }

  handleActiServi = async (idService) =>{

    const service_id = idService

    try{
      axios
      .post('/servicesStatusChange', { service_id })
      .then(res => {
        if(res.data.response){
          this.setState({
            sucesMessage: res.data.message
          })
          this.fetchInfoServices()
        }else{
          this.setState({
            error: res.message
          })
        }
      })
    }catch(error){
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

  _isMobile(){
    if (isMobile) {
      return "content-scroll-mobile"
    }else{
      return "content-scroll-pc"
    }
  }

  handleChange = (e) =>{
    this.setState({
        form: {
            ...this.state.form,
            [e.target.name]: e.target.value 
        }
    })  
  }

  shortText = (text) =>{
    if(text.length > 157){
      return text.substring(0,157)+'...'
    }else{
      return text
    }
  }

  handleClick = () =>{
    if (this.state.editShowing) {
      this.setState({
        editShowing: false
      })
    } else {
      this.setState({
        file: null,
        file_url: null,
        editShowing: true
      })
    }
  }

  handleBackEdit = () => {
    this.setState({
      editShowing: false
    })
  }

  estadoDesac = (estatus) =>{
    if(estatus != "active"){
      return "mode-desactivado"
    }
  }

  arrowBackButton = () =>{
    this.props.history.goBack()
  }

  hanldeImageProfile = () => {
    if (Object.keys(this.state.datos.userProfileImage).length != 0) {
      return this.state.url+this.state.datos.userProfileImage?.profile_image
    }
  }

  handleChangeInput = (e) =>{
    if (e.target.files[0]) {
        this.setState({
            file_url: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
    }
  }

  generadorPerfil(data){
      return (
            <div>
              <div className="p-2 d-flex caja-titulo-perfil">
                <div onClick={this.arrowBackButton}><ArrowBack/></div>
                <div className="centrar ti-perf fin-title ">Mi perfil</div>
                <div className="ti-perf"><FaEllipsisV className="click-mode" onClick={this.openModalHandler} /></div>
              </div>
              <div className="p-2 p-out caja-perfil ">
                <div className="lapiz" onClick={this.handleClick}><img alt="pencil" src={pencil}></img></div>
                <div className="d-flex justify-content-center">
                  <div id="circulo-foto" className={"" + 
                    Object.entries(this.state.url+this.state.datos.userProfileImage).length == 0                     
                    ?
                    " border-foto"
                    :
                    null
                  }>
                    {Object.entries(this.state.url+this.state.datos.userProfileImage).length == 0 
                    ?
                    <img className="centro-imagen-smile" alt="profile-iamge" src={smile}/>
                    :
                    <img className="centro-imagen-circulo" alt="profile-iamge" src={this.state.url+this.state.datos.userProfileImage?.profile_image}/>
                    }                                       
                  </div>              
                </div>
                <div className="medio">
                  {this.state.datos.name} · {(this.state.datos.date_birth != null) ? calculateAge(this.state.datos.date_birth) + " años": "Sin Edad" } 
                </div>
              </div>
              
              <Link to="/newservice"><button onClick={this.handleNewService} className="buton-crear-servi">Crear servicio </button></Link>

              <div className={"container content-scroll "+ this._isMobile()}>
                {
                 
                (this.state.servicios.length != 0) 
                ? 
                data.map( (ser) => {return(this.eachService(ser))})
                :
                <div className="p-2 centrar vamos">¡Vamos, crea tu primer servicio! </div>
              
                } 
                {console.log(data)}            
              </div>
            </div>
      )
  }

  eachService = (each) =>{
    return(
      <div key={each.id}>
        <Link className="hover-no" to={"/viewService/"+each.id}>
        <input type="hidden" id="serviceID" name="serviceID" value={each.id}/>
        <div className={"p-2 titutlo-servi margen-izqui change-tama "+ this.estadoDesac(each.status)}>{each.title}</div>
        <div className={"p-2 margen-izqui precio-name change-tama2 "+ this.estadoDesac(each.status)}>{each.price} €/hora</div>
        <div className={"p-2 textoSercice espacio-iz resumen change-tama2 "+ this.estadoDesac(each.status)}>
          {this.shortText(each.description)}
        </div>
        </Link>
        <div className="p-2">
            <div className="d-flex flex-row justify-content-left">
                <div className={"p-2 ml-3 "+ this.estadoDesac(each.status)}>
                    <Rating 
                    style={{height: "unset"}} 
                    size={18} 
                    filledColor="#ed8a19" 
                    borderColor="#ed8a19" 
                    rating={each.avg_rating} 
                    />
                </div>
                <div className={"p-2 "+ this.estadoDesac(each.status)}>
                    <div className="counter-star">{each.avg_rating}</div>
                </div>
                <div>
                    <IoIosHeart className={"estilo-cora "+ this.estadoDesac(each.status)}/>
                </div>
                <div className={"counter-cora "+ this.estadoDesac(each.status)}>
                    {each.fav_count}
                </div>
                
                <button onClick={this.handleActiServi.bind(this, each.id)} className={(each.status == "active") ? "buton-desactivar": "buton-activar"}>{(each.status == "active") ? "Desactivar": "Activar"}</button>
            </div>                        
        </div>
      </div>
    )
  }

  

  generadorEditPerfil = () =>{
    return(
    <React.Fragment>
      <div className="p-2 d-flex caja-titulo-perfil">
        <div onClick={this.handleBackEdit}><ArrowBack/></div>
        <div className="centrar ti-perf fin-title ">Editar mi perfil</div>        
      </div>
      
      <div className="p-2 editar-caja-perfil ">
        <div className="d-flex justify-content-center p-out">
          <div className="editar-circulo-foto">
            {Object.entries(this.state.url+this.state.datos.userProfileImage).length == 0 
            ?
            <img className="centro-imagen-smile" alt="profile-iamge" src={this.state.file == null ? smile : this.state.file_url}/>
            :
            <img className="centro-imagen-circulo" alt="profile-iamge" src={this.state.file == null ? this.state.url+this.state.datos.userProfileImage?.profile_image : this.state.file_url}/>
            } 
          </div>              
        </div>
        <label className="labelinput">
          <input onChange={this.handleChangeInput} type="file" placeholde="foto" className="input-stl"/>
          <div className="medio type-letra">Cambiar Foto</div>                  
        </label>
      </div>
      
      <form className="p-2" onSubmit={this.handleSubmitEdit}>
        <div className="form-group">
          <label className="ne-linea label-titulos ml-4 pl-2">Mi nombre</label>
          <input className="entrada-input-button" type="text" id="name" name="name" value={this.state.form.name} onChange={this.handleChange}></input>
        </div>
        <div className="form-group">
          <label className="ne-linea label-titulos ml-4 pl-2">Mi año de nacimiento</label>          
          <input className="entrada-input-button" type="number" min="1945" max="2019" id="date_of_birth" name="date_birth" placeholder="" value={this.state.form.date_birth != null ? this.state.form.date_birth.split("-",1)[0]: ""} onChange={this.handleChange}></input>
        </div>
        <div className="form-group">
          <button className="buton-crear-servi guardar">Guardar</button>
        </div>
      </form>
    </React.Fragment>
    )
  }

  render(){

    

    if (this.state.redirect) {
      return (<Redirect to="/" />)
    }

    return (
      <div className="d-flex flex-column p-out">
        <div class="progress" style={{height: "2px", display: this.state.progress_status}}>
          <div class="progress-bar" role="progressbar" style={{width: this.state.progress+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
          { this.state.editShowing ? this.generadorEditPerfil(): this.generadorPerfil(this.state.servicios) }

          { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

          <div style={{display: this.state.hide}}>          
          <Modal
              show={this.state.isShowing}
              close={this.closeModalHandler}
              userId={this.state.user_id}
          />          
          </div>
          
          { !this.state.editShowing ? <Bar></Bar>: null}
          
      </div>
    );
  }
 
}

export default MyProfile;