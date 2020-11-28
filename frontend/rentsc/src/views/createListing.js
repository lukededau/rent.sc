import React from 'react';
import { Button, Form, Alert} from 'react-bootstrap';
import NavigationBar from '../Components/navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase';
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { MdSmokeFree } from "react-icons/md";
import { AiOutlineCar } from "react-icons/ai";
// import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

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
            parkingSpots: "",
            uid: "",
            email: "",
            username: "",
            imageUrl: null
            reviews: [],
        };
        this.tags = {
            'dogFriendly': false,
            'catFriendly': false,
            'apartment': false,
            'house': false,
            'townhouse': false,
            'entirePlace': false,
            'sharedRoom': false,
            'privateRoom': false,
            'furnished': false,
            'pool': false,
            'fireplace': false,
            'AC': false,
            'streetParking': false,
            'smokerFriendly': false
        };
        this.imageState = { url: null };
        this.docID = { docID: null };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.storeTag = this.storeTag.bind(this);
        this.makeListing = this.makeListing.bind(this);

        this.fullSubmit = this.fullSubmit.bind(this)
    }

    // apartment, house, townhouse, shared room, private room, pool,fireplace, AC, parkingspots, street parking, smoking allowed
    storeTag(event) {
        if (event.target.name) {
            this.tags[event.target.name] = !this.tags[event.target.name];
        }
    }

    // Handles image upload change
    handleChange(e) {
        const imageTypes = ['image/png', 'image/jpg', 'image/jpeg']

        if (e.target.files[0] && imageTypes.includes(e.target.files[0].type)){
            const image = e.target.files[0]
            this.image = image
        } else {
            this.image = null
        }
    }

    // Handles image upload
    handleUpload() {
        const image = this.image
        const storageRef = firebase.storage().ref(image.name)

        storageRef.put(image).on('state_changed', snapshot => {
            const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.progress = progress
        }, (err) => {
            this.error = err
        }, () => {
            storageRef.getDownloadURL()
            .then((url) => {
                this.url = url
                this.state.imageUrl = url
                this.fullSubmit()
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        for (var i = 1; i < form.elements.length; i++) {
            var element = form.elements[i];
            if (element.if !== "" && element.value !== "") {
                this.state[element.id] = element.value
            }
        }

        // Add user info
        this.state.uid = firebase.auth().currentUser.uid
        this.state.email = firebase.auth().currentUser.email
        this.state.username = firebase.auth().currentUser.displayName

        this.state["tags"] = this.tags

        // Handle photo upload
        this.handleUpload()
    }

    makeListing() {
        const db = firebase.firestore().collection('listing');
        db.doc().set(this.state)
    }

    fullSubmit() {
        this.makeListing()
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} style={{ paddingTop: '100px', paddingLeft: '50px', width: '25%' }}>
                {/* Image Fields */}
                <Form.Group controlId="image">
                    <Form.Label> Images </Form.Label>
                    <Form.Control type="file" onChange={this.handleChange}></Form.Control>
                    {this.error && <Alert variant="danger">{this.error}</Alert>}
                    {/*<Button type="button" name="upload" onClick={this.handleUpload}>Upload</Button>*/}
                </Form.Group>                
                {/* Text Fields */}
                <Form.Group controlId="address">
                    <Form.Label> Address </Form.Label>
                    <Form.Control type="text" placeholder="Address" required/>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label> City </Form.Label>
                    <Form.Control type="text" placeholder="City" required/>
                </Form.Group>
                <Form.Group controlId="zip">
                    <Form.Label> Zip </Form.Label>
                    <Form.Control type="text" placeholder="Zip Code" required/>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label> Price per Month </Form.Label>
                    <Form.Control type="text" placeholder="Price" required/>
                </Form.Group>
                <Form.Group controlId="size">
                    <Form.Label> Maximum No. of Tenants </Form.Label>
                    <Form.Control type="number" placeholder="Max # Tenents" required/>
                </Form.Group>
                <Form.Group controlId="numBedrooms">
                    <Form.Label> Number of Bedrooms </Form.Label>
                    <Form.Control type="number" placeholder="# of Bedrooms" required/>
                </Form.Group>
                <Form.Group controlId="numBaths">
                    <Form.Label> Number of Baths </Form.Label>
                    <Form.Control type="number" placeholder="# of Bathrooms" required/>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label> Description </Form.Label>
                    <Form.Control required type="text" placeholder="Description" />
                </Form.Group>

                {/* Tags */}
                <label> Type of Place: </label> <br></br>
                {/* <ToggleButtonGroup type="checkbox" defaultValue={false} name="apartment">
                    <ToggleButton value={false} variant="outline-primary" name="apartment" onClick={this.storeTag} value={0}>Apartment</ToggleButton>
                </ToggleButtonGroup> */}

                <Button type="button" name="apartment" onClick={this.storeTag}>
                    Apartment
                    </Button>
                &nbsp;&nbsp;&nbsp;
                    <Button type="button" name="house" onClick={this.storeTag}>
                    House
                    </Button> {' '}
                &nbsp;&nbsp;&nbsp;
                    <Button type="button" name="townhouse" onClick={this.storeTag}>
                    Townhouse
                    </Button> {' '}
                <br></br>

                <label> Type of Rental: </label> <br></br>
                <Button type="button" name="entirePlace" onClick={this.storeTag}>
                    Entire Place
                    </Button> {' '}
                &nbsp;&nbsp;&nbsp;
                <Button type="button" name="sharedRoom" onClick={this.storeTag}>
                    Shared Room
                    </Button> {' '}
                &nbsp;&nbsp;&nbsp;
                    <Button type="button" name="privateRoom" onClick={this.storeTag}>
                    Private Room
                    </Button>
                <br></br>

                <label> Amenities: </label> <br></br>
                <Button type="button" name="furnished" onClick={this.storeTag}>
                    Furnished
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="button" name="pool" onClick={this.storeTag}>
                    Pool
                    </Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="button" name="fireplace" onClick={this.storeTag}>
                    Fireplace
                    </Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="button" name="AC" onClick={this.storeTag}>
                    AC
                    </Button>
                <br></br>

                <label> Pets: </label> <br></br>
                <Button type="button" name="dogFriendly" onClick={this.storeTag}>
                    Dog friendly <FaDog />
                </Button> {' '}
                &nbsp;&nbsp;&nbsp;
                    <Button type="button" name="catFriendly" onClick={this.storeTag}>
                    Cat friendly  <FaCat />
                </Button>
                <br></br>

                <Form.Group controlId="parkingSpots">
                    <Form.Label> Parking Spots on Premise:</Form.Label>
                    <Form.Control type="text" placeholder="0 spots" />
                </Form.Group>

                <Button type="button" name="streetParking" onClick={this.storeTag}>
                    Street Parking <AiOutlineCar />
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="button" name="smokerFriendly" onClick={this.storeTag}>
                    Smoker Friendly <MdSmokeFree />
                </Button>

                <br></br>
                <br></br>


        <   Button variant="primary" type="submit">
                    Submit
                </Button>
                <br></br>
                <br></br>
            </Form >
        );
    }
}
// 'apartment': false,
// 'house': false,
// 'townhouse': false,
// 'sharedRoom': false,
// 'privateRoom': false,
// 'pool': false,
// 'fireplace': false,
// 'AC': false,
// 'parkingSpots': 0,
// 'streetParking': false,
// 'smokerFriendly': false
function createListing() {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <ListingFields />
        </div>
    );
}

export default createListing;
