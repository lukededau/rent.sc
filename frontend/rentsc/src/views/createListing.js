import React from 'react';
import { Button, Form, Row, Col, Container, Image} from 'react-bootstrap';
import NavigationBar from '../Components/navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase';
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { MdSmokeFree } from "react-icons/md";
import { AiOutlineCar, AiOutlineConsoleSql } from "react-icons/ai";
import { withRouter } from 'react-router-dom'
// import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

import defaultImage from '../Images/SantaCruz.jpg'

class ListingFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            unit: "",
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
            reviews: [],
            imageURL: []
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
        this.imageState = {
            images: [],
            url: null 
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.uploadTask = this.uploadTask.bind(this);
        this.storeTag = this.storeTag.bind(this);
        this.makeListing = this.makeListing.bind(this);
        this.fullSubmit = this.fullSubmit.bind(this);
    }

    // apartment, house, townhouse, shared room, private room, pool,fireplace, AC, parkingspots, street parking, smoking allowed
    storeTag(event) {
        if (event.target.name) {
            this.tags[event.target.name] = !this.tags[event.target.name];
        }
    }

    // Handles MULTIPLE image change
    handleChange(e) {
        // Specified file types
        //const imageTypes = ['image/png', 'image/jpg', 'image/jpeg']

        if (e.target.files) {
            const filesArray = Array.from(e.target.files)
            this.imageState.images = filesArray
        }
        else {
            this.error = "Please select images to upload"
        }
    }

    // Handle upload MULTPIPLE image upload
    async handleUpload() {
        const imageNames = Array.from(this.imageState.images)

        for (var i = 0; i < imageNames.length; i++) {
            await this.uploadTask(imageNames[i], imageNames.length)
        }
    }

    uploadTask(img, length) {
        const storageRef = firebase.storage().ref(img.name)

        storageRef.put(img).on('state_changed', snapshot => {
            const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
        }, (err) => {
            this.error = err
        }, () => {
            storageRef.getDownloadURL()
                .then((url) => {
                    if (this.state.imageURL == null) {
                        this.state.imageURL = url
                    }
                    else if (this.state.imageURL != null) {
                        this.state.imageURL.push(url)
                    }
                    if (this.state.imageURL.length == length) {
                        this.fullSubmit()
                    }
                })
        })
    }

    async handleSubmit(event) {
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
        await this.handleUpload()
    }

    async fullSubmit() {
        await this.makeListing()
        setTimeout(() => {
            this.props.history.push('/listings')
        }, 1000)
    }

    makeListing() {
        const db = firebase.firestore().collection('listing');
        db.doc().set(this.state)
    }

    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>

                <Container style={{paddingTop: '100px'}}>
                    <Row style={{alignItems: 'center'}}>
                        <Col>
                <Form onSubmit={this.handleSubmit} style={{width: '45%'}}>
                    {/* Image Fields */}
                    <Form.Group controlId="image">
                        <Form.Label> Images </Form.Label>
                        <Form.File type="file" multiple onChange={this.handleChange} required/>
                    </Form.Group>

                    {/* Text Fields */}
                    <Form.Row>
                        <Form.Group as={Col} controlId="address">
                            <Form.Label> Address </Form.Label>
                            <Form.Control type="text" placeholder="Address" required/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="unit">
                            <Form.Label> Unit Number </Form.Label>
                            <Form.Control type="text" placeholder="(optional)"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="city">
                            <Form.Label> City </Form.Label>
                            <Form.Control type="text" placeholder="City" required/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="zip">
                            <Form.Label> Zip </Form.Label>
                            <Form.Control type="text" placeholder="Zip Code" required/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="price">
                        <Form.Label> Price per Month </Form.Label>
                        <Form.Control type="text" placeholder="Price" required/>
                    </Form.Group>
                    <Form.Group controlId="size">
                        <Form.Label> Maximum No. of Tenants </Form.Label>
                        <Form.Control as="select" size="sm" required>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="numBedrooms">
                            <Form.Label> Bedrooms </Form.Label>
                            <Form.Control as="select" size="sm" required>
                                <option>0</option>                     
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="numBaths">
                            <Form.Label> Bathrooms </Form.Label>
                            <Form.Control as="select" size="sm" required>
                                <option>0</option>                       
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="description">
                        <Form.Label> Description </Form.Label>
                        <Form.Control as="textarea" rows={4} required placeholder="Description" />
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

                    <br></br>

                    <Form.Row>
                        <Col>Parking spots on premise:</Col>
                        <Form.Group as={Col} controlId="parkingSpots">
                            <Form.Control type="text" placeholder="0 spots" />
                        </Form.Group>
                    </Form.Row>

                    <Button type="button" name="streetParking" onClick={this.storeTag}>
                        Street Parking <AiOutlineCar />
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="button" name="smokerFriendly" onClick={this.storeTag}>
                        Smoker Friendly <MdSmokeFree />
                    </Button>

                    <br></br>
                    <br></br>

                    <Button variant="primary" type="submit">Submit</Button>
                    <br></br>
                    <br></br>
                </Form>
                </Col>
                </Row>
                </Container>
            </div>
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

export default withRouter(ListingFields);
