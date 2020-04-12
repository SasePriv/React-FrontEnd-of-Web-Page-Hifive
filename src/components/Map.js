import React, { Component } from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps'
import { FaWindows } from 'react-icons/fa'

class Map extends Component {
  constructor(props){
    super(props)

    this.state= {
      selected: true
    }
  }


  /**
  * This Event triggers when the marker window is closed
  *
  * @param event
  */
  onInfoWindowClose = ( event ) => {};

  render() {
     return (
      <GoogleMap 
        defaultZoom={this.props.zoom}
        defaultCenter={{ lat: (this.props.center.lat), lng: this.props.center.lng }}
      >
        <Marker                         
            draggable={this.props.draggable}
            onDragEnd={ this.props.onDragEnd }
            position={{ lat:  this.props.form.latitude, lng: this.props.form.longitude }}      
        />
        <InfoWindow
          onClose={this.onInfoWindowClose}
          position={{ lat: ( this.props.form.latitude + 0.0013 ), lng: this.props.form.longitude }}
        >
          <div>
              <span style={{ padding: 0, margin: 0, fontSize: "10px"}}>{ this.props.form.address }</span>
          </div>
        </InfoWindow>
      </GoogleMap>
     )
  }
}

export default withScriptjs(
    withGoogleMap(
      Map
    )
);