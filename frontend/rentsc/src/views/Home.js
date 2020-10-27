import React, { Component } from 'react';
import { withProps, compose } from 'recompose'
import NavBar from '../common/NavBar';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const InitialMap = compose(
    withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&v=3.exp&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `935px`, width: '100%' }} />,
            mapElement: <div style={{ height: `100%` }} /> 
        }),
        withScriptjs,
        withGoogleMap
    )(props => 
    <GoogleMap
        defaultCenter = { { lat: 36.9741, lng: -122.0308 } }
        defaultZoom = { 14 }
    >
    {props.markers.map(marker => (
        <Marker
            key={marker.id}
            position={{
                lat: marker.position.lat,
                lng: marker.position.lng
            }}
            onClick={() => props.onMarkerClick(marker.id)}
        >
            {props.selectedMarker === marker.id && 
            <InfoWindow
                onCloseClick={() => props.onClose()}
            >
                <div>
                    <h4>{marker.name}</h4>
                </div>
            </InfoWindow>}
        </Marker>
    ))};
    </GoogleMap>
);

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMarker: 0,
            markers:[
                {
                    id: 1,
                    name: "For Rent",
                    position: {
                        lat: 36.9757,
                        lng: -122.0370
                    }
                },
                {
                    id: 2,
                    name: "For Sell",
                    position: {
                        lat: 36.9730,
                        lng: -122.0286
                    }
                }
            ]
        };
    }

    // query firebase with this function
    // componentDidMount() {
    //     let list = { restaurants : []}
    //     database.ref('..').on('value', restaurants => {
    //             restaurants.forEach( restaurant => {
    //                     list.restaurants.push({'name': restaurant.key,
    //                             'longitude': restaurant.val().lng,
    //                             'latitude': restaurant.val().lat}
    
    //                         )
    //             })
    //             this.setState({ markers:  list.restaurants });
    //         })
    
    // }

    onMarkerClick = (markerID) => {
        if(this.state.selectedMarker === markerID) {
            this.setState({
                selectedMarker: 0
            });
        }
        else {
            this.setState({
                selectedMarker: markerID
            });
        }
    }

    onClose = () => {
        this.setState({
            selectedMarker: 0
        });
    };

    // shouldComponentUpdate(nextProps, nextState) {
    //     return (this.state.selectedMarker !== nextState.selectedMarker);
    // }
    
    render() {
        return (
            <div>
                <NavBar />
                <InitialMap
                    selectedMarker={this.state.selectedMarker}
                    markers={this.state.markers}
                    onMarkerClick={this.onMarkerClick}
                    onClose={this.onClose}
                />
            </div>
        );
    }
}
  
export default Home;