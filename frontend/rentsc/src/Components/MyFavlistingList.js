import React from 'react'
import 'firebase/auth';
import firebase from '../firebase.js';
import ListingObject from './listingObject.js'
import axios from 'axios'
import { GrFavorite } from "react-icons/gr";

class MyFavListingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listings: [],
            listings1: [],
            favListings: [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/app/getAllListings')
            .then((response) => {
                var myListings = []

                for (const i of response.data) {
                    if (i.uid !== firebase.auth().currentUser.uid) {
                        myListings.push(i)
                    }
                }
                this.setState({ listings1: myListings })
                this.checkFavorited();
            })
    }

    checkFavorited = async () => {
        var myListings = []
        for (const i of this.state.listings1) {
            const ref = await firebase.firestore().collection('users').where("email", "==", firebase.auth().currentUser.email).where("favorites", "array-contains", i.address).get()
            if (!ref.empty) {
                myListings.push(i)
            }
        }
        this.setState({ listings: myListings })
    }

    renderListing() {
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
                <h2 style={{ paddingTop: "10px", paddingLeft: "2%" }}> My Favorites <GrFavorite /> </h2>

                {this.renderListing()}
            </div >
        );
    }
}

export default MyFavListingList
