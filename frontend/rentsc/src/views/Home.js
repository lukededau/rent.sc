/*global google*/
import React, { Component } from 'react';
import firebase from '../firebase.js';
import { withProps, compose } from 'recompose';
import Geocode from 'react-geocode';
import { withRouter } from 'react-router-dom';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs, DirectionsRenderer } from 'react-google-maps';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
Geocode.setApiKey(API_KEY);

const transportPanelStyle = {
    position: "absolute",
    top: "10px",
    left: "25%",
    zIndex: 5,
    backgroundColor: "#fff",
    padding: 5,
    border: "1px solid #999",
    textAlign: "center",
    lineHeight: "30px",
    paddingLeft: "10px",
}

const InitialMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `935px`, width: '100%' }} />,
        mapElement: <div style={{ height: `100%` }} /> 
    }),
    withScriptjs,
    withGoogleMap,
    )(props => 
    <GoogleMap
        defaultCenter = { { lat: 36.9741, lng: -122.0308 } }
        defaultZoom = { 14 }
    >
    <DirectionsRenderer
        directions={props.directions}
        options={{
            suppressMarkers: true
        }}
    />
    {props.markers.map(marker => (
        <Marker
            key={marker.id}
            position={{
                lat: marker.position.lat,
                lng: marker.position.lng
            }}
            onClick={() => props.onMarkerClick(marker.id, marker.position.lat, marker.position.lng)}
        >
            {props.selectedMarker === marker.id && 
            <InfoWindow onCloseClick={() => props.onClose()}>
                <div style={{width: 250, height: 300}}>
                    <h4>{marker.address}</h4>
                    <div style={{textAlign: 'center'}}>
                    <Carousel>
                        {
                            marker.imageURL.map((image, idx) => {
                                return (
                                    <Carousel.Item>
                                        <img src={image} style={{width: 250, height: 200, padding: 10}} alt={idx}/>
                                    </Carousel.Item>
                                )
                            })
                        }
                    </Carousel>
                    </div>
                    <p style={{fontSize: 15, margin: 5}}>Description: {marker.description}</p>
                    <p style={{fontSize: 15, margin: 5}}>Price: {marker.price}</p>
                    <p style={{fontSize: 15, margin: 5}}>Max Number of Tenents: {marker.size}</p>
                    <p style={{fontSize: 15, margin: 5}}>Number of Baths: {marker.numBaths}</p>
                    <p style={{fontSize: 15, margin: 5}}>Number of Bedrooms: {marker.numBedrooms}</p>
                    <p style={{fontSize: 15, margin: 5}}>Tags: {marker.tags}</p>
                    <p style={{fontSize: 15, margin: 5}}>Travel Time: {props.travelTime}</p>
                    <br></br>
                    <Button variant="outline-primary" size="sm" onClick={() => props.onViewButtonClick(marker.address, marker.city)}>
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
    directionsService = null;

    constructor(props) {
        super(props);
        this.state = {
            selectedMarker: 0,
            markers:[],
            directions: null,
            currentTravelTime: "",
            calcTravelTimes: [],
            transportMode: "DRIVING",
        };
    }

    componentDidMount() {
        this._fetchListings();
    }

    async _fetchListings() {
        this.allListings = [];
        const db = firebase.firestore();
        const listings = await db.collection('listing').get();
        var id = 1;

        const responses = [];
        listings.forEach((listing) => {
            responses.push(new Promise(async (resolve) => {
                const {address, city, zip, description, numBaths, numBedrooms, price, size, tags, imageURL} = listing.data();
              
                // Create tag string
                var verifiedTags = [];
                Object.keys(tags).forEach(function (key) {
                    if (tags[key]) {
                        verifiedTags.push(key);
                    }
                })
                var tagString = verifiedTags.join(", ");

                // Handle missing image
                var images;
                if (imageURL == null) {
                    images = [];
                }
                else {
                    images = imageURL;
                }

                const coordinates = await this._convertAddressToCoordinates(address, city);
                if(coordinates.lat !== 0 && coordinates.lng !== 0) {
                    this.allListings.push({
                        'id': id++,
                        'address': address,
                        'city': city,
                        'zip': zip,
                        'description':description,
                        'numBaths': numBaths,
                        'numBedrooms': numBedrooms,
                        'price': price,
                        'size': size,
                        'imageURL': images,
                        'tags': tagString,
                        'position': {
                            'lat': coordinates.lat,
                            'lng': coordinates.lng
                        }
                    });
                }
                resolve();
            }));
        });

        Promise.all(responses).then(() => {
            this.setState({
                markers: this.allListings
            });
        });
    }

    _renderDirections(latitude, longitude) {
        if(this.directionsService === null) {
            this.directionsService = new google.maps.DirectionsService();
        }
        const origin = new google.maps.LatLng(latitude, longitude);
        var destination;
        var selectedMode = document.getElementById("mode").value;
        if(selectedMode === "DRIVING"){
            destination = new google.maps.LatLng(36.990984, -122.053040);
        }
        else {
            destination = new google.maps.LatLng(36.998829, -122.060826);
        }
        
        this.directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode[selectedMode]
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                        currentTravelTime: result.routes[0].legs[0].duration.text
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }

    _convertAddressToCoordinates = async (address, city) => {
        let lat = 0, lng = 0;
        try{
            const response = await Geocode.fromAddress(address + ", " + city);
            lat = response.results[0].geometry.location.lat;
            lng = response.results[0].geometry.location.lng;
        }
        catch(e) {
            console.error(e);
        }
        return { lat, lng };
    }

    _calculateDrivingTransitTravelTime(latitude, longitude) {
        if(this.directionsService === null) {
            this.directionsService = new google.maps.DirectionsService();
        }
        const origin = new google.maps.LatLng(latitude, longitude);
        var destination;
        var selectedMode = ["DRIVING", "TRANSIT"];
        var travelTimeResults = [];
        const responses = [];
        selectedMode.forEach(mode => {
            responses.push(new Promise(async (resolve) => {
                if(mode === "DRIVING"){
                    destination = new google.maps.LatLng(36.990984, -122.053040);
                }
                else {
                    destination = new google.maps.LatLng(36.998829, -122.060826);
                }
                
                this.directionsService.route(
                    {
                        origin: origin,
                        destination: destination,
                        travelMode: google.maps.TravelMode[mode]
                    },
                    (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            travelTimeResults.push(result.routes[0].legs[0].duration.text);
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                        resolve();
                    }
                );
            }));
        });

        Promise.all(responses).then(() => {
            this.setState({
                calcTravelTimes: travelTimeResults
            });
        });
    }

    _handleViewListingButtonClick = (address, city) => {
        const { history } = this.props;
        history.push({
            pathname: '/main-listing',
            state: {
                selectedAddress: address,
                selectedCity: city,
                drivingTravelTime: this.state.calcTravelTimes[0],
                transitTravelTime: this.state.calcTravelTimes[1]
            }
        }); 
    }

    onMarkerClick = (markerID, markerLat, markerLng) => {
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
        this._calculateDrivingTransitTravelTime(markerLat, markerLng);
        this._renderDirections(markerLat, markerLng);
    }

    onClose = () => {
        this.setState({
            selectedMarker: 0
        });
    };
    
    render() {
        return (
            <div>
                <div style={transportPanelStyle}>
                    <b>Mode of Travel: </b>
                    <select id="mode">
                        <option value="DRIVING">Driving</option>
                        <option value="WALKING">Walking</option>
                        <option value="BICYCLING">Bicycling</option>
                        <option value="TRANSIT">Transit</option>
                    </select>
                </div>
                <InitialMap
                    selectedMarker={this.state.selectedMarker}
                    markers={this.state.markers}
                    directions={this.state.directions}
                    travelTime={this.state.currentTravelTime}
                    onMarkerClick={this.onMarkerClick}
                    onClose={this.onClose}
                    onViewButtonClick={this._handleViewListingButtonClick}
                />
            </div>
        );
    }
}
  
export default withRouter(Home);