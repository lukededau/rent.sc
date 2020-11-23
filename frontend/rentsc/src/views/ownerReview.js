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

    updateState() {
        console.log("prop2", this.props)

    }
    async handleSubmit(event) {
        this.updateState();
        event.preventDefault();


        // Add user info
        this.state.uid = firebase.auth().currentUser.uid
        this.state.email = firebase.auth().currentUser.email
        this.state.username = firebase.auth().currentUser.displayName


        await this.updateListing();
    }

    updateListing() {
        console.log("prop", this.props)
        const db = firebase.firestore();
        var post = db.collection('listings').doc()
        console.log("Post", post)
        post.update({ 'size': 3 })
        console.log("Post", post)
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

                    <Form.Group controlId="friend">
                        <Form.Label>Friendliness</Form.Label>
                        <Form.Control as="select">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="respond">
                        <Form.Label>Responsiveness</Form.Label>
                        <Form.Control as="select" >
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="consider">
                        <Form.Label>Considerate</Form.Label>
                        <Form.Control as="select">
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="lenient">
                        <Form.Label>Lenient</Form.Label>
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

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default Review_Owner;
