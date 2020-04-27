import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './styles/bar.css';

class Bar extends Component{
    constructor(){
        super();
        this.state = {
            auth: true
        }
    }

    notificaction(){
        if (this.state.auth) {
            return (<span className="circule"></span>);
        }
    }

    render(){

        return(
            <div className="bar ">
                <div className="d-flex justify-content-center ajust">
                    <div  className="mr-5">
                        <Link to="/">
                            <img src={require("../assets/img/menu1.png")}></img>
                        </Link>
                    </div>
                    <div  className="ml-2 mr-2" >
                        <Link to="/chat-menu">
                            <img src={require("../assets/img/Vector.png")}></img>
                            {this.notificaction()}                            
                        </Link>                        
                    </div>
                    <div className="ml-5 perso">
                        <Link to="/myprofile">
                            <img src={require("../assets/img/menu3.png")}></img>
                        </Link>                        
                    </div>
                </div>
            </div>
        )
    }

}

export default Bar;