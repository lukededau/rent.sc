import React, {Component} from 'react';
import NavBar from '../common/NavBar';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  
export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {google: this.props.google};
    }
    // state = {
    //     google: this.props.google
    // }
    // static getDerivedStateFromProps(props, state) {
    //     return null;
    // }
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
    apiKey: API_KEY
})(Home);