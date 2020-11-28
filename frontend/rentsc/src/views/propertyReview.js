import React from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase.js';
import 'firebase/auth';
import { MdRateReview } from "react-icons/md";

class PropertyReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.temp = {
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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() { }

    updateState() { }

    async handleSubmit(event) {

        event.preventDefault();
        const form = event.currentTarget;

        for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            if (this.temp.type !== "submit") {
                this.temp[element.id] = element.value
            }
        }

        // Add current user info
        this.temp.postingAddress = this.props.address
        this.temp.uid = firebase.auth().currentUser.uid
        this.temp.email = firebase.auth().currentUser.email
        this.temp.username = firebase.auth().currentUser.displayName

        await this.updateListing();
        alert("Submitted!");
    }

    updateListing() {
        const db = firebase.firestore();

        for (let p in this.temp) {
            if (p.length !== 0) {
                this.state[p] = this.temp[p]
            }
        }

        db.collection('propertyReviews').doc().set(this.state)
    }

    render() {
        return (

            <Form onSubmit={this.handleSubmit} >

                <h4 style={{ paddingTop: '3%', paddingLeft: '2%', width: '50%' }}>
                    <Form.Group controlId="review">
                        <Form.Label> Write a review <MdRateReview /></Form.Label>
                        <Form.Control type="text" required as="textarea" rows={4} placeholder="Review..." />
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