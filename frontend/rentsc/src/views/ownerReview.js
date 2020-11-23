import React from 'react';
import { Button, Form } from 'react-bootstrap';
import NavigationBar from '../Components/navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase.js';
import 'firebase/auth';
import { MdRateReview } from "react-icons/md";

class Review_Owner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.storeTag = this.storeTag.bind(this);
        // this.makeListing = this.makeListing.bind(this);

    }

    // storeTag(event) {
    //     this.tags[event.target.name] = !this.tags[event.target.name];
    // }

    // async handleSubmit(event) {
    //     event.preventDefault();
    //     const form = event.currentTarget;
    //     for (var i = 0; i < form.elements.length; i++) {
    //         var element = form.elements[i];
    //         //console.log(element.id + " " + element.value);
    //         if (element.if !== "" && element.value !== "") {
    //             this.state[element.id] = element.value
    //         }
    //     }

    //     // Add user info
    //     this.state.uid = firebase.auth().currentUser.uid
    //     this.state.email = firebase.auth().currentUser.email
    //     this.state.username = firebase.auth().currentUser.displayName

    //     this.state["tags"] = this.tags;
    //     await this.makeListing();
    // }

    // makeListing() {
    //     const db = firebase.firestore();
    //     db.collection('listing').doc().set(this.state)
    // }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} style={{ paddingTop: '5%', paddingLeft: '2%', width: '35%' }}>

                <Form.Group controlId="address">
                    <Form.Label> Write a review <MdRateReview /></Form.Label>
                    <Form.Control type="text" as="textarea" rows={3} placeholder="Review..." />
                </Form.Group>
                <Form.Label>Friendliness</Form.Label>
                <Form.Control as="select">
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
                <Form.Label>Responsiveness</Form.Label>
                <Form.Control as="select">
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
                <Form.Label>Considerate</Form.Label>
                <Form.Control as="select">
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
                <Form.Label>Lenient</Form.Label>
                <Form.Control as="select">
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
                <br></br>
                {/*Accuracy Location Value Cleanliness*/}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

function ownerReview() {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Review_Owner />
        </div>
    );
}

export default ownerReview;
