import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import NavigationBar from '../Components/navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase';
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { MdSmokeFree } from "react-icons/md";
import { AiOutlineCar, AiOutlineConsoleSql } from "react-icons/ai";
import { withRouter } from 'react-router-dom'
import { ToggleButton, ButtonGroup } from 'react-bootstrap';


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
        this.ifSignedIn = { ifSignedIn: false };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.uploadTask = this.uploadTask.bind(this);
        this.storeTag = this.storeTag.bind(this);
        this.makeListing = this.makeListing.bind(this);
        this.fullSubmit = this.fullSubmit.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }

    // apartment, house, townhouse, shared room, private room, pool,fireplace, AC, parkingspots, street parking, smoking allowed
    storeTag(event) {
        if (event.target.name) {
            this.tags[event.target.name] = !this.tags[event.target.name];
        }
        this.setState(this.state);
    }

    // Handles MULTIPLE image change
    handleChange(e) {

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

        var neededElems = ['address', 'description', 'unit', 'price', 'city', 'size', 'zip', 'numBaths', 'numBedrooms', 'parkingSpots']
        for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];

            if (element.if !== "" && neededElems.includes(element.id) && element.value !== "") {
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

    checkUser() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) { this.ifSignedIn = true }
            else { this.props.history.push('/login') }
        })
    }

    render() {

        return (
            <div>
                <NavigationBar></NavigationBar>
                {this.checkUser()}

                <div style={{ paddingTop: '5%', paddingLeft: '3%' }}>
                    <Row style={{ alignItems: 'center' }}>
                        <Col>
                            <Form onSubmit={this.handleSubmit} style={{ width: '35%' }}>

                                {/* Text Fields */}
                                <Form.Row>
                                    <Form.Group as={Col} controlId="address">
                                        <Form.Label> Address </Form.Label>
                                        <Form.Control type="text" placeholder="Address" required />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="unit">
                                        <Form.Label> Unit Number </Form.Label>
                                        <Form.Control type="text" placeholder="(optional)" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="city">
                                        <Form.Label> City </Form.Label>
                                        <Form.Control type="text" placeholder="City" required />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="zip">
                                        <Form.Label> Zip </Form.Label>
                                        <Form.Control type="text" placeholder="Zip Code" required />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="price">
                                    <Form.Label> Price per Month </Form.Label>
                                    <Form.Control type="text" placeholder="Price" required />
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

                                {/* Image Fields */}
                                <Form.Group controlId="image">
                                    <Form.Label> Images </Form.Label>
                                    <Form.File type="file" multiple onChange={this.handleChange} required />
                                </Form.Group>


                                {/* Tags */}
                                <label> Type of Place: </label> <br></br>

                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton name="apartment" type="checkbox" variant="outline-primary" checked={this.tags['apartment']} onChange={this.storeTag} >
                                        Apartment
                                    </ToggleButton>
                                </ButtonGroup>
                                &nbsp;&nbsp;&nbsp;

                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton name="house" type="checkbox" variant="outline-primary" checked={this.tags['house']} onChange={this.storeTag} >
                                        House
                                    </ToggleButton>
                                </ButtonGroup>
                                &nbsp;&nbsp;&nbsp;

                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton name="townhouse" type="checkbox" variant="outline-primary" checked={this.tags['townhouse']} onChange={this.storeTag} >
                                        Townhouse
                                    </ToggleButton>
                                </ButtonGroup>
                                &nbsp;&nbsp;&nbsp;

                                <br></br>

                                <label> Type of Rental: </label> <br></br>
                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton name="entirePlace" type="checkbox" variant="outline-info" checked={this.tags['entirePlace']} onChange={this.storeTag} >
                                        Entire Place
                                    </ToggleButton>
                                </ButtonGroup>
                                &nbsp;&nbsp;&nbsp;

                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton name="sharedRoom" type="checkbox" variant="outline-info" checked={this.tags['sharedRoom']} onChange={this.storeTag} >
                                        Shared Room
                                    </ToggleButton>
                                </ButtonGroup>
                                &nbsp;&nbsp;&nbsp;

                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton name="privateRoom" type="checkbox" variant="outline-info" checked={this.tags['privateRoom']} onChange={this.storeTag} >
                                        Private Room
                                    </ToggleButton>
                                </ButtonGroup>
                                &nbsp;&nbsp;&nbsp;

                                <br></br>

                                <label> Amenities: </label> <br></br>
                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton name="furnished" type="checkbox" variant="outline-dark" checked={this.tags['furnished']} onChange={this.storeTag} >
                                        Furnished
                                    </ToggleButton>
                                </ButtonGroup>
                                &nbsp;&nbsp;&nbsp;

                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton name="pool" type="checkbox" variant="outline-dark" checked={this.tags['pool']} onChange={this.storeTag} >
                                        Pool
                                    </ToggleButton>
                                </ButtonGroup>
                                &nbsp;&nbsp;&nbsp;

                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton name="fireplace" type="checkbox" variant="outline-dark" checked={this.tags['fireplace']} onChange={this.storeTag}>
                                        Fireplace
                                    </ToggleButton>
                                </ButtonGroup>
                                &nbsp;&nbsp;&nbsp;

                                 <ButtonGroup toggle className="mb-2">
                                    <ToggleButton name="AC" type="checkbox" variant="outline-dark" checked={this.tags['AC']} onChange={this.storeTag} >
                                        AC
                                    </ToggleButton>
                                </ButtonGroup>
                                &nbsp;&nbsp;&nbsp;

                                <br></br>

                                <label> Pets: </label> <br></br>
                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton name="dogFriendly" type="checkbox" variant="outline-success" checked={this.tags['dogFriendly']} onChange={this.storeTag} >
                                        Dog friendly <FaDog />
                                    </ToggleButton>
                                </ButtonGroup>
                                &nbsp;&nbsp;&nbsp;

                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton name="catFriendly" type="checkbox" variant="outline-success" checked={this.tags['catFriendly']} onChange={this.storeTag} >
                                        Cat friendly  <FaCat />
                                    </ToggleButton>
                                </ButtonGroup>
                                &nbsp;&nbsp;&nbsp;

                                <br></br>

                                <br></br>

                                <Form.Row>
                                    <Col sm={3}>Parking spots on premise:</Col>
                                    <Form.Group controlId="parkingSpots">
                                        <Form.Control type="text" placeholder="0 spots" />
                                    </Form.Group>
                                </Form.Row>

                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton name="streetParking" type="checkbox" variant="outline-primary" checked={this.tags['streetParking']} onChange={this.storeTag} >
                                        Street Parking <AiOutlineCar />
                                    </ToggleButton>
                                </ButtonGroup>
                                &nbsp;&nbsp;&nbsp;

                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton name="smokerFriendly" type="checkbox" variant="outline-danger" checked={this.tags['smokerFriendly']} onChange={this.storeTag} >
                                        Smoker Friendly <MdSmokeFree />
                                    </ToggleButton>
                                </ButtonGroup>
                                &nbsp;&nbsp;&nbsp;

                                <br></br>
                                <br></br>

                                <Button variant="primary" type="submit">Submit</Button>
                                <br></br>
                                <br></br>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default withRouter(ListingFields);
