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
      auth: false,
      info: [],
      error: null
    }
  }
  
  async componentDidMount(){
    await this.fetchInfo();
  }

  componentWillMount = () =>{
    if (sessionStorage.getItem("userData")) {
      this.setState({
          auth: true
      })
    }
  }

  fetchInfo = async () => {
    try {
      axios.get('http://localhost:3008/getAllServices').then(res => {
        this.setState({
          info: res.data.data
        })
      })
    } catch (error) {
        this.setState({
          error
        })
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
              <Content 
                data={this.state.info}
                auth={this.state.auth}
              />
              {this.mostrar()}
            </div>
          </div>
      </div>
    );
  }
 
}

export default Home;
