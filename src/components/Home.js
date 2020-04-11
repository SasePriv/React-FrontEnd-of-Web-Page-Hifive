import React, {Component} from 'react';
import Category from './Category'
import Search from './Search'
import Content from './Content'
import Bar from './Bar';
import Settings from '../assets/svg/settings.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './styles/home.css'
import { faThList } from '@fortawesome/free-solid-svg-icons';

class Home extends Component{

  constructor(){
    super();
    this.state = {
      user_id: "",
      auth: false,
      info: [],
      error: null,
      latitude: '',
      longitude: '',
      url: "https://hifive.es/hifive-rest-api/public/serviceImages/"
    }
    
  }
  
  async componentDidMount(){
    if(this.state.user_id != ""){
      navigator.geolocation.getCurrentPosition((position) => {
        let x = position.coords.latitude;
        let y = position.coords.longitude;
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
          console.log(res)
          this.setState({
            info: res.data.data
          })
        }else{
          console.log(res)
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
    // const currentData =  JSON.parse(sessionStorage.getItem('userData'))
    if (this.state.auth){
      return(
        <Link to={"/myprofile/"}>
          <img className="settings-button" src={Settings}  />
        </Link>
      )
    }
  }


  render(){
    
    // console.log(this.state.error)
    // console.log("Latitude: "+this.state.latitude+ ", Longitude: "+this.state.longitude)

    return (
      <div className="d-flex justify-content-center flex-column p-out">
          <div className="p-2 p-out order-2">
            <div>
              <Category></Category>
            </div>
          </div>
          <div className="d-inline-flex p-2 ajust-size order-1">
            <div>
              <Search></Search>
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
              <Content 
                data={this.state.info}
                auth={this.state.auth}
                url={this.state.url}      
                
              />
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
