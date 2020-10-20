import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../firebase/firebase.js';

// Initialize Firebase and Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

class ListingFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            price: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        db.collection('listing').doc().set(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Address:
                    <input type="text" name="address" value={this.state.address} onChange={this.handleChange} />
                </label>
                <br></br>
                <label>
                    Price:
                    <input type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                </label>
                <br></br>
                <input type="submit" value="Create Listing" />
            </form>
        );
    }
}

function createListing() {  
    return(
        <ListingFields />
    );
}

export default createListing;