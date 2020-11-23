import React from 'react';
import { Button, Form } from 'react-bootstrap';
import NavigationBar from '../Components/navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase.js';
import 'firebase/auth';
import { MdRateReview } from "react-icons/md";
import axios from 'axios'

class PropertyReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lis_tings: [],
            uid: "",
            email: "",
            username: "",
            reviews: []

        };

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
        axios.get('http://127.0.0.1:8000/app/getAllListings')
            .then((response) => {
                var listing_stream = response.data;
                this.setState({ lis_tings: listing_stream })
            })
        // console.log("test1", this.listings)

    }

    updateState() {

        console.log("prop2", this.props)
        // const db = firebase.firestore();
        // var docs = db.collection(u'listings').where(u'size', u'==', 5).stream()
        // var docs1 = this.getMarker()
        // console.log(docs1)
        console.log("docs1", this.state)
        // var x = db.collection('listings').document()
        // console.log(x)

    }
    async handleSubmit(event) {

        event.preventDefault();
        this.updateState();
        const form = event.currentTarget;


        // Add user info
        this.state.uid = firebase.auth().currentUser.uid
        this.state.email = firebase.auth().currentUser.email
        this.state.username = firebase.auth().currentUser.displayName


        await this.updateListing();
    }

    updateListing() {
        console.log("prop", this.props)
        // const db = firebase.firestore();
        // var post = db.collection('listings').doc()
        // console.log("Post", post)
        // post.update({ 'size': 3 })
        // console.log("Post", post)
        // db.collection('listing').doc().set(this.state)
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} >
                <h4 style={{ paddingTop: '3%', paddingLeft: '2%', width: '50%' }}>
                    <Form.Group controlId="address">
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
                {/* {this.updateState()} */}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form >
        );
    }
}

// function propertyReview() {
//     return (
//         <div>
//             <NavigationBar></NavigationBar>
//             <PropertyReview />
//         </div>
//     );
// }

export default PropertyReview;
