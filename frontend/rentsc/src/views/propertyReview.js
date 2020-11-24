import React from 'react';
import { Button, Form } from 'react-bootstrap';
import NavigationBar from '../Components/navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase.js';
import 'firebase/auth';
import { MdRateReview } from "react-icons/md";
// import axios from 'axios'

class PropertyReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // lis_tings: [],
            postingAddress: "",
            uid: "",
            email: "",
            username: "",
            review: "",
            accuracy: 0,
            location: 0,
            value: 0,
            clean: 0,

        };
        this.mama = {
            // lis_tings: [],
            postingAddress: "",
            uid: "",
            email: "",
            username: "",
            review: "",
            accuracy: 0,
            location: 0,
            value: 0,
            clean: 0,

        }
        this.listings = []
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.storeTag = this.storeTag.bind(this);
        // this.updateListing = this.updateListing.bind(this);

    }
    // async getMarker() {
    //     const db = firebase.firestore();
    //     const snapshot = await db.collection('listings')
    //     console.log("snapshot", snapshot)
    //     snapshot.get().then((querySnapshot) => {
    //         const tempDoc = querySnapshot.docs.map((doc) => {
    //             return { id: doc.id, ...doc.data() }
    //         })
    //         console.log(tempDoc)
    //     })
    //     // return snapshot.get().docs.map(doc => doc.data());
    // }

    componentDidMount() {
        // console.log("test", this.listings)
        // axios.get('http://127.0.0.1:8000/app/getAllListings')
        //     .then((response) => {
        //         var listing_stream = response.data;
        //         console.log("consoleee", this.state.uid === "")
        //         console.log("Before", this.state)
        //         if (this.state.uid !== "") {
        //             this.setState({ lis_tings: listing_stream })
        //         }
        //         console.log("After", this.state)
        //     })
        // console.log("test1", this.listings)

        // console.log("stops", this.props)
        // console.log("stops1", this.state)
        // this.updateState();
        // console.log("stops2", this.state)
        // console.log("test2", this.listings)

    }

    updateState() {

        // console.log("prop2", this.props)
        // // const db = firebase.firestore();
        // // var docs = db.collection(u'listings').where(u'size', u'==', 5).stream()
        // // var docs1 = this.getMarker()
        // // console.log(docs1)
        // console.log("docs1", this.mama)
        // // var x = db.collection('listings').document()
        // // console.log(x)

    }
    async handleSubmit(event) {
        // console.log("1right hereeeeeeeee", this.mama)
        event.preventDefault();
        console.log("prop2", this.props)
        console.log("prop2", this.state)
        console.log("prop2", this.mama)
        console.log("ici", this.mama)

        // console.log("1right hereeeeeeeee", this.state)
        // this.state.uid = firebase.auth().currentUser.uid
        // this.state.email = firebase.auth().currentUser.email
        // this.state.username = firebase.auth().currentUser.displayName
        // console.log("2right hereeeeeeeee", this.state)
        const form = event.currentTarget;

        for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];

            // console.log("element", element, "TYPE.", element.type, ".idddd", ".", this.state.type !== '', element.id, ".")
            if (this.mama.type !== "submit") {
                // console.log("josue leyva", element.id)
                this.mama[element.id] = element.value
                // console.log("right hereeeeeeeee", this.mama)
            }
        }

        // Add current user info
        this.mama.postingAddress = this.props.address
        this.mama.uid = firebase.auth().currentUser.uid
        this.mama.email = firebase.auth().currentUser.email
        this.mama.username = firebase.auth().currentUser.displayName



        await this.updateListing();
    }

    updateListing() {
        // console.log("prop", this.state, this.mama)
        // const db = firebase.firestore();
        // var post = db.collection('listings').doc()
        // console.log("Post", post)
        // post.update({ 'size': 3 })
        // console.log("Post", post)
        // db.collection('listing').doc().set(this.state)
        const db = firebase.firestore();
        // for (state in this.state) {
        // console.log("STATEEEE", state)
        // }

        for (let p in this.mama) {
            // console.log("mammmmaa", this.mama[p], this.mama[p].k === 0, p, p.length === 0, this.mama.hasOwnProperty(p))
            if (p.length !== 0) {
                this.state[p] = this.mama[p]
            }
        }
        // console.log("prop final", this.state, this.mama)
        db.collection('propertyReviews').doc().set(this.state)
    }

    render() {
        return (

            <Form onSubmit={this.handleSubmit} >

                <h4 style={{ paddingTop: '3%', paddingLeft: '2%', width: '50%' }}>
                    <Form.Group controlId="review">
                        <Form.Label> Write a review <MdRateReview /></Form.Label>
                        <Form.Control type="text" as="textarea" rows={4} placeholder="Review..." />
                    </Form.Group>
                </h4>

                <h6 style={{ paddingTop: '-5%', paddingLeft: '2%', width: '10%' }}>

                    <Form.Group controlId="accuracy">
                        <Form.Label >Accuracy</Form.Label>
                        <Form.Control as="select">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control as="select">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="value">
                        <Form.Label>Value</Form.Label>
                        <Form.Control as="select">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="clean">
                        <Form.Label>Cleanliness</Form.Label>
                        <Form.Control as="select">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                </h6>
                <br></br>
                {/*Accuracy Location Value Cleanliness*/}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form >
        );
    }
}

export default PropertyReview;