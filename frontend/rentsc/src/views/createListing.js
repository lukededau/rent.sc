import React from 'react';
import firebase from '../firebase/firebase.js';

class ListingFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            price: "",
            numBedrooms: "",
            numBaths: "",
            size: "",
            description: ""
        };
        this.tags = {
            'dog friendly': false,
            'cat friendly': false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.storeTag = this.storeTag.bind(this);
        this.makeListing = this.makeListing.bind(this);
    }

    storeTag(event) {
        this.tags[event.target.name] = !this.tags[event.target.name];
        console.log(this.tags);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.state["tags"] = this.tags;
        await this.makeListing();
    }

    makeListing() {
        const db = firebase.firestore();
        db.collection('listing').doc().set(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} ref={(listingForm) => this.listingForm = listingForm}>
                {/* Text fields */}
                <label>
                    Address:
                    <input type="text" name="address" value={this.state.address} onChange={this.handleChange} />
                </label> <br></br>
                <label>
                    Price:
                    <input type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                </label> <br></br>
                <label>
                    Maximum Tenents:
                    <input type="text" name="size" value={this.state.size} onChange={this.handleChange} />
                </label> <br></br>
                <label>
                    Number of Bedrooms:
                    <input type="text" name="numBedrooms" value={this.state.numBedrooms} onChange={this.handleChange} />
                </label> <br></br>
                <label>
                    Number of Bathrooms:
                    <input type="text" name="numBaths" value={this.state.numBaths} onChange={this.handleChange} />
                </label> <br></br>
                <label>
                    Description:
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                </label> <br></br>

                {/* Tags */}
                <label> Tags: </label>
                <button type="button" name="dog friendly" onClick={this.storeTag}> 
                    dog friendly
                </button> 
                <button type="button" name="cat friendly" onClick={this.storeTag}> 
                    cat friendly
                </button><br></br>

                {/* Submit */}
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