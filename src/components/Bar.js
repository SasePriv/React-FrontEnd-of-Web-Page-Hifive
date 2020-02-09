import React, {Component} from 'react';
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
                        <a href="#">
                            <img src={require("../assets/img/menu1.png")}></img>
                        </a>
                    </div>
                    <div  className="ml-2 mr-2" >
                        <a href="#">
                            <img src={require("../assets/img/Vector.png")}></img>
                            {this.notificaction()}                            
                        </a>                        
                    </div>
                    <div className="ml-5 perso">
                        <a href="#">
                            <img src={require("../assets/img/menu3.png")}></img>
                        </a>                        
                    </div>
                </div>
            </div>
        )
    }

}

export default Bar;