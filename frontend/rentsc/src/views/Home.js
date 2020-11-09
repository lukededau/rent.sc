import React, { Component } from 'react';
import firebase from '../firebase.js';
import { withProps, compose } from 'recompose';
import NavBar from '../common/NavBar';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

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
            {
            props.selectedMarker === marker.id && 
            <InfoWindow onCloseClick={() => props.onClose()}>
                <div style={{width: 250, height: 300}}>
                    <h4>{marker.address}</h4>
                    <p style={{'text-align': 'center'}}>
                    <Carousel>
                        <Carousel.Item>
                            <img src={marker.image} style={{width: 250, height: 200, padding: 10}} alt="listing 1"></img>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={marker.image} style={{width: 250, height: 200, padding: 10}} alt="listing 2"></img>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={marker.image} style={{width: 250, height: 200, padding: 10}} alt="listing 3"></img>
                        </Carousel.Item>
                    </Carousel>
                    </p>
                    <p style={{'font-size': 15, margin: 5}}>Description: {marker.description}</p>
                    <p style={{'font-size': 15, margin: 5}}>Price: {marker.price}</p>
                    <p style={{'font-size': 15, margin: 5}}>Max Number of Tenents: {marker.size}</p>
                    <p style={{'font-size': 15, margin: 5}}>Number of Baths: {marker.numBaths}</p>
                    <p style={{'font-size': 15, margin: 5}}>Number of Bedrooms: {marker.numBedrooms}</p>
                    <p style={{'font-size': 15, margin: 5}}>Tags: {marker.tags}</p>
                    <br></br>
                    {/* <p style={{'font-size': 15}}>
                        Description: {marker.description} <br></br>
                        Price: {marker.price} <br></br>
                        Max Number of Tenents: {marker.size} <br></br>
                        Number of Baths: {marker.numBaths} <br></br>
                        Number of Bedrooms: {marker.numBedrooms} <br></br>
                        Tags: {marker.tags}
                    </p> */}
                    <Button variant="outline-primary" size="sm" onclick="location.href='/create-listing'">
                        View Listing
                    </Button>
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
                const tags = {
                    'dog friendly': true,
                    'cat friendly': true
                };
                var verifiedTags = [];
                Object.keys(tags).forEach(function (key) {
                    if (tags[key]) {
                        verifiedTags.push(key);
                    }
                })
                var tagString = verifiedTags.join(", ");
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
                    'image': require('./../Images/default_listing.png'),
                    'price': "1000",
                    'size': "3",
                    'description': 'Its a house',
                    'tags': tagString
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