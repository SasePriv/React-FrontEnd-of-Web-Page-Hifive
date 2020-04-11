import React, { Component } from 'react';
import { GOOGLE_API_KEY } from '../googleApiKey.js'
import  Map from './Map'
import { GoogleMap } from 'react-google-maps';

class Pruebas extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            latitude: "",
            longitude: "",
            userAddress: ""
         }
        this.getLocation = this.getLocation.bind(this)
        this.getReverseGeoCoordinates = this.getReverseGeoCoordinates.bind(this)
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    getCoordinates = (position) =>{        
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        this.getReverseGeoCoordinates()
    }

    getReverseGeoCoordinates = () => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=${GOOGLE_API_KEY}`)
        .then(response => response.json())
        .then(data => this.setState({
            userAddress: data.results[0].formatted_address
        }))
        .catch(error => alert(error))
    }

    handleLocationError = (error) =>{
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
            default:
                alert("An unknown error occurred.")                
        }
    }



    render() { 
        return ( 
            <div>
                <button onClick={this.getLocation}>prueba</button>
                <br></br>
                <label>Latitude: </label>
                <label>{this.state.latitude}</label>
                <br></br>
                <label>Longitude: </label>
                <label>{this.state.longitude}</label>
                <br></br>
                <label>Address: </label>
                <label>{this.state.userAddress}</label>


                <div>
                    {this.state.latitude && this.state.longitude ?
                    <img 
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${this.state.latitude},${this.state.longitude}&key=${GOOGLE_API_KEY}`} 
                    alt='map' />
                    :
                    null
                    }
                </div>

                <Map
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${GOOGLE_API_KEY}`} 
                    containerElement= {<div style={{height: '400px'}}/>}
                    mapElement={<div style={{height: '100%'}} />}
                    loadingElement={<p>Cargando</p>}
                />

            </div>
         );
    }
}
 
export default Pruebas;