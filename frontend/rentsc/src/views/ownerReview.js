import React from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase.js';
import 'firebase/auth';
import { MdRateReview } from "react-icons/md";

class Review_Owner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            owner_uid: "",
            owner_email: "",
            owner_username: "",
            reviewer_uid: "",
            reviewer_email: "",
            reviewer_username: "",
            review: "",
            friendliness: 0,
            lenient: 0,
            considerate: 0,
            responsiveness: 0,

        };

        this.temp = {
            owner_uid: "",
            owner_email: "",
            owner_username: "",
            reviewer_uid: "",
            reviewer_email: "",
            reviewer_username: "",
            review: "",
            friendliness: 0,
            lenient: 0,
            considerate: 0,
            responsiveness: 0,

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

        this.temp.owner_uid = this.props.uid
        this.temp.owner_email = this.props.email
        this.temp.owner_username = this.props.username
        this.temp.reviewer_uid = firebase.auth().currentUser.uid
        this.temp.reviewer_email = firebase.auth().currentUser.email
        this.temp.reviewer_username = firebase.auth().currentUser.displayName

        await this.updateListing();
        alert("Submitted!");
        window.location.reload(false);
    }

    updateListing() {

        const db = firebase.firestore();

        for (let p in this.temp) {
            if (p.length !== 0) {
                this.state[p] = this.temp[p]
            }
        }

        db.collection('ownerReviews').doc().set(this.state)
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} >
                {this.updateState()}
                <h4 style={{ paddingTop: '3%', paddingLeft: '2%', width: '50%' }}>
                    <Form.Group controlId="review">
                        <Form.Label> Write a review <MdRateReview /></Form.Label>
                        <Form.Control required type="text" as="textarea" rows={4} placeholder="Review..." />
                    </Form.Group>
                </h4>
                <h6 style={{ paddingTop: '-5%', paddingLeft: '2%', width: '10%' }}>

                    <Form.Group controlId="friendliness">
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

                    <Form.Group controlId="responsiveness">
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
                {this.updateState()}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default Review_Owner;
