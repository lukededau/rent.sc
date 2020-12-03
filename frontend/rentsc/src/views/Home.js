import React, { Component } from 'react';
import firebase from '../firebase.js';
import { withProps, compose } from 'recompose';
import NavBar from '../common/NavBar';
import Geocode from 'react-geocode';
import { withRouter } from 'react-router-dom';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

Geocode.setApiKey(API_KEY);

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

    constructor(props) {
        super(props);
        this.state = {
            selectedMarker: 0,
            markers:[],
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
                // console.log(coordinates);
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
            // console.log(this.allListings);
            this.setState({
                markers: this.allListings
            });
        });
    }

    _convertAddressToCoordinates = async (address, city) => {
        
        let lat = 0, lng = 0;
        try{
            const response = await Geocode.fromAddress(address + ", " + city);
            lat = response.results[0].geometry.location.lat;
            lng = response.results[0].geometry.location.lng;
        }
        catch(e) {
            
        }
        return { lat, lng };
    }

    _handleViewListingButtonClick = (address, city) => {
        const { history } = this.props;
        history.push({
            pathname: '/main-listing',
            state: {
                selectedAddress: address,
                selectedCity: city
            }
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
                    onViewButtonClick={this._handleViewListingButtonClick}
                />
            </div>
        );
    }
}
  
export default withRouter(Home);