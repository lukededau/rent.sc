import React from 'react';
import { Button, Form } from 'react-bootstrap';
import NavigationBar from '../Components/navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase.js';

class ListingFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            city: "",
            zip: "",
            price: "",
            numBedrooms: 0,
            numBaths: 0,
            size: "",
            description: ""
        };
        this.tags = {
            'dogFriendly': false,
            'catFriendly': false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.storeTag = this.storeTag.bind(this);
        this.makeListing = this.makeListing.bind(this);
    }

    storeTag(event) {
        this.tags[event.target.name] = !this.tags[event.target.name];
    }

    async handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            console.log(element.id + " " + element.value);
            if (element.if !== "" && element.value !== "") {
                this.state[element.id] = element.value
            }
        }
        console.log(this.state)
        this.state["tags"] = this.tags;
        await this.makeListing();
    }

    makeListing() {
        const db = firebase.firestore();
        db.collection('listing').doc().set(this.state);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} style={{ paddingTop: '100px', paddingLeft: '50px', width: '25%' }}>

                {/* Text Fields */}
                <Form.Group controlId="address">
                    <Form.Label> Address </Form.Label>
                    <Form.Control type="text" placeholder="Address" />
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label> Price per Month </Form.Label>
                    <Form.Control type="text" placeholder="Price" />
                </Form.Group>
                <Form.Group controlId="size">
                    <Form.Label> Maximum No. of Tenants </Form.Label>
                    <Form.Control type="text" placeholder="Max # Tenents" />
                </Form.Group>
                <Form.Group controlId="numBedrooms">
                    <Form.Label> Number of Bedrooms </Form.Label>
                    <Form.Control type="integer" placeholder="# of Bedrooms" />
                </Form.Group>
                <Form.Group controlId="numBaths">
                    <Form.Label> Number of Baths </Form.Label>
                    <Form.Control type="integer" placeholder="# of Bathrooms" />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label> Description </Form.Label>
                    <Form.Control type="text" placeholder="Description" />
                </Form.Group>

                {/* Tags */}
                <label> Tags </label> <br></br>
                <div className="btn-toolbar">
                    <Button type="button" name="dogFriendly" onClick={this.storeTag}>
                        dog friendly
                </Button>
                    <Button type="button" name="catFriendly" onClick={this.storeTag}>
                        cat friendly
                </Button>
                </div> <br></br>

                <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>
        );
    }
}

function createListing() {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <ListingFields />
        </div>
    );
}

export default createListing;
