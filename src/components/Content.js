import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import ImageLoader  from './ImageLoader.js';
import LazyLoad from 'react-lazy-load';

import './styles/Content.css'

import { home } from '../assets/datos_prueba.json'

class Content extends Component{
    constructor(props){
        super(props);
        this.state = {
            home,
            auth: props.auth
        };
    }

    getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
    deg2rad = (deg) => {
    return deg * (Math.PI/180)
    }
    
    generador(data){
        if (this.state.auth) {
            return (
                <div className="d-flex justify-content-center flex-wrap">
                    {data.map( (currentData) => {
                        return(
                            <div className="card card-mod" key={currentData.id}>
                                <Link to={{
                                    pathname: "/viewService/" + currentData.id,
                                    state: {currentData}
                                }}>
                                    <input type="hidden" id="serviceID" name="serviceID" value={currentData.id} />
                                    <input type="hidden" id="userID" name="userID" value={currentData.user_id} />
                                    <LazyLoad 
                                        width={288}
                                        height={216}
                                        debounce={false}
                                        offsetVertical={250}
                                        
                                    >
                                    <div className="img-container">
                                        <ImageLoader className="card-img-top" alt={currentData.alt} src={(this.props.url+currentData.serviceImage[0].attachment)} />
                                    </div>
                                    </LazyLoad>
                                    <div className="card-body card-mod-text">
                                        <h6 className="card-text mt-1 font-weight-bold">{currentData.title}</h6>
                                        <p className="card-text font-weight-bold">{currentData.price}€/h · <span className="texto-dis">{this.getDistanceFromLatLonInKm(this.props.latitude, this.props.longitude, currentData.latitude, currentData.longitude).toFixed(1)} km de mi</span></p>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
             ) 
        }else{
            return (
                <div className="d-flex justify-content-center flex-wrap">
                    <div className="card card-mod" style={data[0] ? null : {display: "none"}}>
                        <LazyLoad 
                            width={288}
                            height={216}
                            debounce={false}
                            offsetVertical={250}
                            
                        >
                        <div className="img-container">
                            <ImageLoader className="card-img-top" alt={data[0]} src={(this.props.url+data[0]?.serviceImage[0].attachment)} />
                        </div>
                        </LazyLoad>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">{data[0]?.title}</h6>
                            <p className="card-text font-weight-bold">{data[0]?.price}€/h · <span className="texto-dis">{this.getDistanceFromLatLonInKm(this.props.latitude, this.props.longitude, data[0]?.latitude, data[0]?.longitude).toFixed(1)} km de mi</span></p>
                        </div>
                    </div>
                    <div className="card card-mod" style={data[1] ? null : {display: "none"}}>
                        <LazyLoad 
                            width={288}
                            height={216}
                            debounce={false}
                            offsetVertical={250}
                            
                        >
                        <div className="img-container">
                            <ImageLoader className="card-img-top" alt={data[1]} src={(this.props.url+data[1]?.serviceImage[0].attachment)} />
                        </div>
                        </LazyLoad>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">{data[1]?.title}</h6>
                            <p className="card-text font-weight-bold">{data[1]?.price}€/h · <span className="texto-dis">{this.getDistanceFromLatLonInKm(this.props.latitude, this.props.longitude, data[1]?.latitude, data[1]?.longitude).toFixed(1)} km de mi</span></p>
                        </div>
                    </div>
                    <div className="card card-mod" style={data[2] ? null : {display: "none"}}>
                        <LazyLoad 
                            width={288}
                            height={216}
                            debounce={false}
                            offsetVertical={250}
                            
                        >
                        <div className="img-container">
                            <ImageLoader className="card-img-top" alt={data[2]} src={(this.props.url+data[2]?.serviceImage[0].attachment)} />
                        </div>
                        </LazyLoad>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">{data[2]?.title}</h6>
                            <p className="card-text font-weight-bold">{data[2]?.price}€/h · <span className="texto-dis">{this.getDistanceFromLatLonInKm(this.props.latitude, this.props.longitude, data[2]?.latitude, data[2]?.longitude).toFixed(1)} km de mi</span></p>
                        </div>
                    </div>
                    {/* Aqui comienza la mitad ocapada */}
                    
                    <div className="card card-mod sin-auth" style={data[3] ? null : {display: "none"}}>
                        <LazyLoad 
                            width={288}
                            height={216}
                            debounce={false}
                            offsetVertical={250}
                            
                        >
                        <div className="img-container">
                            <ImageLoader className="card-img-top" alt={data[3]} src={(this.props.url+data[3]?.serviceImage[0].attachment)} />
                        </div>
                        </LazyLoad>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">{data[3]?.title}</h6>
                            <p className="card-text font-weight-bold">{data[3]?.price}€/h · <span className="texto-dis">{this.getDistanceFromLatLonInKm(this.props.latitude, this.props.longitude, data[3]?.latitude, data[3]?.longitude).toFixed(1)} km de mi</span></p>
                        </div>
                    </div>
                    <div className="card card-mod sin-auth" style={data[4] ? null : {display: "none"}}>
                        <LazyLoad 
                            width={288}
                            height={216}
                            debounce={false}
                            offsetVertical={250}
                            
                        >
                        <div className="img-container">
                            <ImageLoader className="card-img-top" alt={data[4]} src={(this.props.url+data[4]?.serviceImage[0].attachment)} />
                        </div>
                        </LazyLoad>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">{data[4]?.title}</h6>
                            <p className="card-text font-weight-bold">{data[4]?.price}€/h · <span className="texto-dis">{this.getDistanceFromLatLonInKm(this.props.latitude, this.props.longitude, data[4]?.latitude, data[4]?.longitude).toFixed(1)} km de mi</span></p>
                        </div>
                    </div>
                    
                    <div className="card card-mod sin-auth" style={data[5] ? null : {display: "none"}}>
                        <LazyLoad 
                            width={288}
                            height={216}
                            debounce={false}
                            offsetVertical={250}                            
                        >
                        <div className="img-container">
                            <ImageLoader className="card-img-top" alt={data[5]} src={(this.props.url+data[5]?.serviceImage[0].attachment)} />
                        </div>
                        </LazyLoad>
                        <div className="card-body card-mod-text">
                            <h6 className="card-text mt-1 font-weight-bold">{data[5]?.title}</h6>
                            <p className="card-text font-weight-bold">{data[5]?.price}€/h · <span className="texto-dis">{this.getDistanceFromLatLonInKm(this.props.latitude, this.props.longitude, data[5]?.latitude, data[5]?.longitude).toFixed(1)} km de mi</span></p>
                        </div>
                    </div>
                    <div className="button buton-regi">
                        <Link to="/signup">
                            <button className="boton">Registrarme</button>
                        </Link>
                    </div>
                </div>
                  
            )    
        }
        
    }

    render(){
        const {data} = this.props
        
        return(
            <div className="container">
                {this.generador(data)}
            </div>
        );
    }
}

export default Content;