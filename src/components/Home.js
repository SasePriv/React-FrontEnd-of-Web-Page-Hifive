/* eslint-disable eqeqeq */
import React, {Component} from 'react';
import Category from './Category'
import Search from './Search'
import Content from './Content'
import Bar from './Bar';
import Settings from '../assets/svg/settings.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './styles/home.css'

class Home extends Component{

  constructor(){
    super();
    this.state = {
      user_id: "",
      auth: false,
      info: [],
      originalInfo: [],
      error: null,
      latitude: '',
      longitude: '',
      url: "http://3.8.170.106/hifive-rest-api/public/serviceImages/",
      catego: {
        selectItem: undefined,
        opcion: 0
      }
    }
    
  }
  
  async componentDidMount(){
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })        
        this.fetchInfo(); 
      },
      (error) => {
        console.log(error)
        if (error.code == error.PERMISSION_DENIED)
          this.setState({
            error: error.code
          })
      }); 
  }

  UNSAFE_componentWillMount = () =>{    
    if (sessionStorage.getItem("userData")) {
      const idUser = JSON.parse(sessionStorage.getItem('userData'))
      this.setState({
          user_id: idUser.id,
          auth: true
      })
    }
  }

  fetchInfo = async (x, y) => {

    const by_user_id = this.state.user_id
    const latitude = this.state.latitude
    const longitude = this.state.longitude

    try {
      await  axios
      .post('/getServices', { by_user_id, latitude, longitude })
      .then(res => {
        if (res.data.response) {
          this.setState({
            info: res.data.data,
            originalInfo: res.data.data
          })
        }else{
          this.setState({
            error_geo: true,
            error: res.message
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  mostrar(){
    if (this.state.auth) {
      return(<Bar></Bar>)
    }
  }

  mostrarSettings = () =>{    
    if (this.state.auth){
      return(
        <Link to={"/myprofile/"}>
          <img className="settings-button" alt="settings" src={Settings}  />
        </Link>
      )
    }
  }

  cateFiltrado = (elemnt, cat1, cat2) =>{

    if (cat2 == undefined) {
      cat2 = false
    }

    if (!cat2) {
      if (elemnt.category == cat1) {
        return true
      } else {
        return false
      }
    } else {
      if (elemnt.category == cat1 || elemnt.category == cat2) {
        return true
      } else {
        return false
      }
    } 
  }

  filtradoCate = (num) =>{
    let cat1 = ""
    let cat2 = ""

    switch (num) {
      case 1:
        cat1 = "Babysister"
        cat2= "Canguros"
        this.setState({
          info: this.state.originalInfo.filter(x => this.cateFiltrado(x, cat1, cat2))
        })
        break;
      case 2:
        cat1 = "Limpieza"
        this.setState({
          info: this.state.originalInfo.filter(x => this.cateFiltrado(x, cat1))
        })
        break;
      case 3:
        cat1 = "Mascotas"
        this.setState({
          info: this.state.originalInfo.filter(x => this.cateFiltrado(x, cat1))
        })
        break;
      case 4:
        cat1 = "Profesores" 
        this.setState({
          info: this.state.originalInfo.filter(x => this.cateFiltrado(x, cat1))
        })
        break;
      case 5:
        cat1 = "Entrenadores" 
        cat2 = "Entrenadores personales"
        this.setState({
          info: this.state.originalInfo.filter(x => this.cateFiltrado(x, cat1, cat2))
        })        
        break;
      case 6:
        cat1 = "Hogar" 
        cat2 = "Reparaciones y manitas"
        this.setState({
          info: this.state.originalInfo.filter(x => this.cateFiltrado(x, cat1, cat2))
        })
        break;
      case 7:
        cat1 = "Otros" 
        this.setState({
          info: this.state.originalInfo.filter(x => this.cateFiltrado(x, cat1))
        })
        break;
      default:
        break;
    }
    
  }

  handaleSelect = (e, number) => {
    e.preventDefault()
    this.setState({
      catego:{
        selectItem: number,
        opcion: 1,
      }
    })

    this.filtradoCate(number)

    // console.log(index)
    // console.log(this.state.selectItem)
  }

  handaleUnSelect = (e) => {
    e.preventDefault()
    this.setState({
      catego:{
        selectItem: undefined,
        opcion: 0
      },
      info: this.state.originalInfo
    })
  }

  eliminarDiacriticos = texto => {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
  }


  filtroSearch = (element, valor) =>{
    let x = this.eliminarDiacriticos(element.title.toLowerCase())
    if (x.includes(this.eliminarDiacriticos(valor.toLowerCase()))) {
      return true
    }else{
      return false
    }
  }

  handleSearchChange = (e) =>{    
    if (e.target.value != "") {
      this.setState({
        info: this.state.info.filter(x => this.filtroSearch(x, e.target.value))
      })
      console.log("denro")
    }else{
      this.setState({
        info: this.state.originalInfo
      })
    }
  }

  handleErraseChange = (e) =>{
    if (e.keyCode === 8) {
      this.setState({
        info: this.state.originalInfo
      })
    }
  }

  render(){
       
    return (
      <div className="d-flex justify-content-center flex-column p-out">
          <div className="p-2 p-out order-2">
            <div>
              <Category 
                setSelected={this.handaleSelect}
                unSelected={this.handaleUnSelect}
                cate={this.state.catego}
              />
            </div>
          </div>
          <div className="d-inline-flex p-2 ajust-size order-1">
            <div>
              <Search 
                onChange={this.handleSearchChange}
                changeErrase={this.handleErraseChange}
              />
            </div>
            <div>
              {this.mostrarSettings()}
            </div>
          </div>
          <div className="p-2 order-3">
            <div>
              {this.state.error == 1
              ?
              <div className="error-message-geo">Por favor active Geolocalización para continuar</div>
              :
              <div className="abajo-margen">
              {this.state.info.length
              ?
              <Content 
                data={this.state.info}
                auth={this.state.auth}
                url={this.state.url}      
                latitude={this.state.latitude}
                longitude={this.state.longitude}
              />
              :
              <div className="error-message-geo">No se encontró ningún servicio</div>
              }
              
              </div>
              }                      
              {this.mostrar()}
            </div>
          </div>
      </div>
    );
  }
 
}

export default Home;
