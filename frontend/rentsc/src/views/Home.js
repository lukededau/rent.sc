import React, { Component } from 'react';
import firebase from '../firebase.js';
import { withProps, compose } from 'recompose';
import NavBar from '../common/NavBar';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <div style={{width: 200, height: 200}} onClick={() => window.location.href="/create-listing"}>
                    <h4>{marker.address}</h4>
                    <img src={marker.image} style={{width: 175, height: 175, padding: 10}} alt="listing image"/> <br></br>
                    <p>
                        Description: <br></br>
                        Price: <br></br>
                        Max Number of Tenents: <br></br>
                        Number of Baths: {marker.numBaths} <br></br>
                        Number of Bedrooms: {marker.numBedrooms} <br></br>
                        Tags:
                    </p>
                </div>
            </InfoWindow>}
        </Marker>
    ))};
    </GoogleMap>
);

export class Home extends Component {

    allListings = [];

    constructor(props) {
        super(props);
        this.state = {
            selectedMarker: 0,
            markers:[]
        };
    }

    componentDidMount() {
        this._fetchListings();
    }

    _fetchListings() {
        this.allListings = [];
        const db = firebase.firestore();
        db.collection('listings').get().then((listings) => {
            listings.forEach((doc) => {
                const {id, name, longitude, latitude} = doc.data();
                this.allListings.push({
                    'id': id,
                    'name': name,
                    'position': {
                        'lat': latitude,
                        'lng': longitude
                    },
                    'address': '417 Maple Street',
                    'numBaths': "1",
                    'numBedrooms': "1",
                    'image': require('./../Images/default_listing.png')
                });
            });
            this.setState({
                markers: this.allListings
            });
        });
    }

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