import React, {Component} from 'react';
import NavBar from '../common/NavBar';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
  };
  
export class Home extends Component {
    state = {
        google: this.props.google
    }
    render() {
        return (
            <div>
                <NavBar />
                <Map
                    google={this.state.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={
                        {
                            lat: 36.9741,
                            lng: -122.0308
                        }
                    }
                />
            </div>
        );
    }
}
  
export default GoogleApiWrapper({
    apiKey: process.env.GOOGLE_MAP_API_KEY
})(Home);