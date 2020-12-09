import React from 'react'
import 'firebase/auth';
import firebase from '../firebase.js';
import ListingObject from './listingObject.js'
import axios from 'axios'

class MyListingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listings: [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/app/getAllListings')
            .then((response) => {
                var myListings = []

                for (const i of response.data) {
                    if (i.uid === firebase.auth().currentUser.uid) {
                        myListings.push(i)
                    }
                }
                this.setState({ listings: myListings })
            })

    }

    renderListing(list) {
        var output = [];

        for (var i = 0; i < this.state.listings.length; i++) {
            var listing = this.state.listings[i];
            output.push(<ListingObject {...listing} />)
        }

        return output
    }

    render() {
        return (
            <div>
                <h4 style={{ paddingTop: "10px", paddingLeft: "18px" }}>My Listings</h4>
                {this.renderListing()}
            </div >
        );
    }
}

export default MyListingList
