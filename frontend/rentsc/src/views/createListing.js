import React from 'react';
import { Button, Form, Alert} from 'react-bootstrap';
import NavigationBar from '../Components/navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase';
import storage from '../firebase';
import timestamp from '../firebase';
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";

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
            description: "",
            uid: "",
            email: "",
            username: ""
        };
        this.tags = {
            'dogFriendly': false,
            'catFriendly': false
        };
        this.imageState = { 
            image: null,
            url: null,
            progress: null,
            error: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.storeTag = this.storeTag.bind(this);
        this.makeListing = this.makeListing.bind(this);
    }

    storeTag(event) {
        this.tags[event.target.name] = !this.tags[event.target.name];
    }

    async handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;

        for (var i = 1; i < form.elements.length; i++) {
            var element = form.elements[i];
            //console.log(element.id + " " + element.value);
            if (element.if !== "" && element.value !== "") {
                this.state[element.id] = element.value
            }
        }

        // Add user info
        this.uid = firebase.auth().currentUser.uid
        this.email = firebase.auth().currentUser.email
        this.username = firebase.auth().currentUser.displayName

        this.state["tags"] = this.tags;
        await this.makeListing();
    }

    // Handles image upload change
    handleChange(e) {
        const imageTypes = ['image/png', 'image/jpg', 'image/jpeg']

        if (e.target.files[0] && imageTypes.includes(e.target.files[0].type)){
            const selected = e.target.files[0]
            this.image = selected
            this.error = ''
            console.log("handlechange: ", this.image)
        } else {
            this.image = null
            this.error = "Please select an image file"
            //console.log(this.image)
        }
    }

    // Handles image upload change
    handleUpload() {
        //console.log("handleUpload:", this.image)
        const image = this.image
        const storageRef = firebase.storage().ref(image.name)
        console.log(storageRef)
        //storage.ref(`images/${image.name}`).put(image)

        storageRef.put(this.image).on('state_changed', snapshot => {
            const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.progress = progress
        }, (err) => {
            this.error = err
        }, async () => {
            const url = await storageRef.getDownloadURL()
            //const createdAt = timestamp()
            this.url = url
        })

        console.log("upload done")
    }

    makeListing() {
        const db = firebase.firestore();
        db.collection('listing').doc().set(this.state)
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} style={{ paddingTop: '100px', paddingLeft: '50px', width: '25%' }}>
                {/* Image Fields */}
                <Form.Group controlId="image">
                    <Form.Label> Images </Form.Label>
                    <Form.Control type="file" onChange={this.handleChange}></Form.Control>
                    {this.error && <Alert variant="danger">{this.error}</Alert>}
                    <br></br>
                    <Button type="button" name="upload" onClick={this.handleUpload}>Upload</Button>
                </Form.Group>                
                {/* Text Fields */}
                <Form.Group controlId="address">
                    <Form.Label> Address </Form.Label>
                    <Form.Control type="text" placeholder="Address" />
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label> City </Form.Label>
                    <Form.Control type="text" placeholder="City" />
                </Form.Group>
                <Form.Group controlId="zip">
                    <Form.Label> Address </Form.Label>
                    <Form.Control type="text" placeholder="Zip Code" />
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label> Price per Month </Form.Label>
                    <Form.Control type="text" placeholder="Price" />
                </Form.Group>
                <Form.Group controlId="size">
                    <Form.Label> Maximum No. of Tenants </Form.Label>
                    <Form.Control type="number" placeholder="Max # Tenents" />
                </Form.Group>
                <Form.Group controlId="numBedrooms">
                    <Form.Label> Number of Bedrooms </Form.Label>
                    <Form.Control type="number" placeholder="# of Bedrooms" />
                </Form.Group>
                <Form.Group controlId="numBaths">
                    <Form.Label> Number of Baths </Form.Label>
                    <Form.Control type="number" placeholder="# of Bathrooms" />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label> Description </Form.Label>
                    <Form.Control type="text" placeholder="Description" />
                </Form.Group>

                {/* Tags */}
                <label> Tags </label> <br></br>
                <div className="btn-toolbar">
                    <Button type="button" name="dogFriendly" onClick={this.storeTag}>
                        Dog friendly <FaDog />
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="button" name="catFriendly" onClick={this.storeTag}>
                        Cat friendly  <FaCat />
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
