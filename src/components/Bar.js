/* eslint-disable eqeqeq */
import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import menu1 from '../assets/svg/menu1.svg'
import menu2 from '../assets/svg/menu2.svg'
import menu3 from '../assets/svg/menu3.svg'
import './styles/bar.css';

class Bar extends Component{
    constructor(){
        super();
        this.state = {
            auth: true,
            user_id: "",
            unreadMessage: 0
        }
    }

    UNSAFE_componentWillMount = () =>{        
        if (sessionStorage.getItem("userData")) {
            const idUser = JSON.parse(sessionStorage.getItem('userData'))
            this.setState({
              user_id: idUser.id
            })
        }
    }

    componentDidMount =  () =>{
        this.fetchUnreadMessage()
    }

    fetchUnreadMessage = async () =>{
        try {
            await axios
            .post("/getUnreadMessagesCount", {user_id: this.state.user_id})
            .then(res =>{
                if (res.data.response) {
                    this.setState({
                        unreadMessage: res.data.data.count
                    })
                }else{
                    console.log("error server unread messages")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    notificaction(){
        if (this.state.unreadMessage != 0) {
            return (<span className="circule"></span>);
        }
    }

    render(){

        return(
            <div className="bar ">
                <div className="d-flex justify-content-center ajust">
                    <div  className="mr-5">
                        <Link to="/">
                            <img alt="grid" src={menu1}></img>
                        </Link>
                    </div>
                    <div  className="ml-2 mr-2" >
                        <Link to="/chat-menu">
                            <img alt="chat" src={menu2}></img>
                            {this.notificaction()}                            
                        </Link>                        
                    </div>
                    <div className="ml-5 perso">
                        <Link to={{
                            pathname:"/myprofile",
                            status: false
                            }}>
                            <img alt="perfil" src={menu3}></img>
                        </Link>                        
                    </div>
                </div>
            </div>
        )
    }

}

export default Bar;