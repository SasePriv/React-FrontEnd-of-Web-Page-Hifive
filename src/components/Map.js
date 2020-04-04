import React, { Component } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

class Map extends Component {
    constructor(props){
        super(props)
    }

  render() {
     return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey=""
        
      >
        <GoogleMap
          id='example-map'
          zoom={8}
        >
        </GoogleMap>
      </LoadScript>
     )
  }
}

export default Map;