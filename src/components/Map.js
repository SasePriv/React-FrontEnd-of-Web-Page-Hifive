import React, { Component } from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps'

class Map extends Component {
    constructor(props){
        super(props)
        this.state = {
          latitude: '',
          longitude: '',
          selectedPark: false 
        }
    }

  render() {
     return (
      <GoogleMap 
        defaultZoom={14} 
        defaultCenter={{ lat: 10.2099297, lng: -68.0107341 }}
      >
        <Marker 
          position={{lat: 10.2099297, lng:-68.0107341}}
          onClick={() => {this.setState({selectedPark: true})}}
          />

        {this.state.selectedPark && (
          <InfoWindow
          // 0.011 and 
            position={{lat: (10.2099297)+0.018, lng:-68.0107341}}
            onCloseClick={() => {this.setState({selectedPark: null})}}            
          >
            <div>Park Details</div>
          </InfoWindow>
        )}

      </GoogleMap>
     )
  }
}

export default withScriptjs(
    withGoogleMap(
      Map
    )
);