import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";

import { GOOGLE_API_KEY } from '../googleApiKey.js'




class Map2 extends React.Component{
    constructor( props ){
        super( props );
    }  
    

    /**
  * When the user types an address in the search box
  * @param place
  */
    onPlaceSelected = ( place ) => {
        const address = place.formatted_address,
        latValue = place.geometry.location.lat(),
        lngValue = place.geometry.location.lng();
        // Set these values in the state.
        this.setState({
        address: ( address ) ? address : '',
        markerPosition: {
            lat: latValue,
            lng: lngValue
        },
        mapPosition: {
            lat: latValue,
            lng: lngValue
        },
        })
    };





    render(){
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                <GoogleMap 
                    google={this.props.google}
                    defaultZoom={this.props.zoom}
                    defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                >

                {/* InfoWindow on top of marker */}
                <InfoWindow
                    onClose={this.onInfoWindowClose}
                    position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
                >
                    <div>
                        <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
                    </div>
                </InfoWindow>

                <Marker 
                    google={this.props.google}
                    name={'Dolores park'}
                    draggable={true}
                    onDragEnd={ this.onMarkerDragEnd }
                    position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                />                         

                </GoogleMap>
                )
            )
        );
        let map;
        if( this.props.center.lat !== undefined ) {
        map = 
        <div>
            <div>
                <div className="form-group">
                    <label htmlFor="">Address</label>
                    <input type="text" name="address" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
                </div>
                <div className="form-group">
                <label htmlFor="">Address</label>
    
                </div>
            </div>                        
            <AsyncMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${GOOGLE_API_KEY}`}
                loadingElement={
                    <div style={{ height: `100%` }} />
                }
                containerElement={
                    <div style={{ height: this.props.height }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
            />
        </div>
        } else {
            map = <div style={{height: this.props.height}} />
        }
        return( map )
    }
}
export default Map2

