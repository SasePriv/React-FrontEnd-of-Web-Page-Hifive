import React, { Component } from 'react';
import { GOOGLE_API_KEY } from '../googleApiKey.js'
import  Map2 from './Map2'
import { GoogleMap } from 'react-google-maps';

class Pruebas2 extends Component {
    constructor(props) {
        super(props);
        this.state = {             
        }

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
                <Map2
                    google={this.props.google}
                    center={{lat: 18.5204, lng: 73.8567}}
                    height='300px'
                    zoom={15}
                />
            </div>
         );
    }
}
 
export default Pruebas2;