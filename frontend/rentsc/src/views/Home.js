import React, { Component } from 'react';
import firebase from '../firebase';
import { withProps, compose } from 'recompose';
import NavBar from '../common/NavBar';
import Geocode from 'react-geocode';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

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
            {props.selectedMarker === marker.id && 
            <InfoWindow
                onCloseClick={() => props.onClose()}
            >
                <div>
                    <h4>{marker.address}</h4>
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

    async _fetchListings() {
        this.allListings = [];
        const db = firebase.firestore();
        const listings = await db.collection('listing').get();
        var id = 1;

        const responses = [];
        listings.forEach((listing) => {
            responses.push(new Promise(async (resolve) => {
                const {address, city, zip, description, numBaths, numBedrooms, price, size, tags: {dogFriendly, catFriendly}} = listing.data();
                const coordinates = await this._convertAddressToCoordinates(address, city);
                console.log(coordinates);
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
                    'tags': {
                        'dogFriendly': dogFriendly,
                        'catFriendly': catFriendly
                    },
                    'position': {
                        'lat': coordinates.lat,
                        'lng': coordinates.lng
                    }
                });
                resolve();
            }));
        });

        Promise.all(responses).then(() => {
            console.log(this.allListings);
            this.setState({
                markers: this.allListings
            });
        });
    }

    _convertAddressToCoordinates = async (address, city) => {
        const response = await Geocode.fromAddress(address + ", " + city);
        const { lat, lng } = response.results[0].geometry.location;
        return { lat, lng };
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