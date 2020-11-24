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
            owner_uid: "",
            owner_email: "",
            owner_username: "",
            reviewer_uid: "",
            reviewer_email: "",
            reviewer_username: "",
            review: "",
            friend: 0,
            lenient: 0,
            consider: 0,
            respond: 0,

        };

        this.mama = {
            owner_uid: "",
            owner_email: "",
            owner_username: "",
            reviewer_uid: "",
            reviewer_email: "",
            reviewer_username: "",
            review: "",
            friend: 0,
            lenient: 0,
            consider: 0,
            respond: 0,

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.storeTag = this.storeTag.bind(this);
        // this.makeListing = this.makeListing.bind(this);

    }
    componentDidMount() { }

    updateState() {
        console.log("prop2", this.props)
        console.log("prop2", this.state)
        console.log("prop2", this.mama)

    }
    async handleSubmit(event) {
        // this.updateState();
        event.preventDefault();
        // console.log("prop2", this.props)
        // console.log("prop2", this.state)
        // console.log("prop2", this.mama)
        // console.log("ici", this.mama)

        const form = event.currentTarget;
        // Add user info
        // this.state.uid = firebase.auth().currentUser.uid
        // this.state.email = firebase.auth().currentUser.email
        // this.state.username = firebase.auth().currentUser.displayName
        console.log("ici", this.mama)

        for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            if (this.mama.type !== "submit") {
                // console.log("josue leyva", element.id)
                this.mama[element.id] = element.value
                // console.log("right hereeeeeeeee", this.mama)
            }
        }
        console.log("ici", this.props)
        this.mama.owner_uid = this.props.uid
        this.mama.owner_email = this.props.email
        this.mama.owner_username = this.props.username
        this.mama.reviewer_uid = firebase.auth().currentUser.uid
        this.mama.reviewer_email = firebase.auth().currentUser.email
        this.mama.reviewer_username = firebase.auth().currentUser.displayName


        await this.updateListing();
    }

    updateListing() {
        // console.log("prop", this.props)
        // const db = firebase.firestore();
        // var post = db.collection('listings').doc()
        // console.log("Post", post)
        // post.update({ 'size': 3 })
        // console.log("Post", post)
        // db.collection('listing').doc().set(this.state)
        const db = firebase.firestore();
        for (let p in this.mama) {
            // console.log("mammmmaa", this.mama[p], this.mama[p].k === 0, p, p.length === 0, this.mama.hasOwnProperty(p))
            if (p.length !== 0) {
                this.state[p] = this.mama[p]
            }
        }
        console.log(this.state)
        db.collection('ownerReviews').doc().set(this.state)
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} >
                {this.updateState()}
                <h4 style={{ paddingTop: '3%', paddingLeft: '2%', width: '50%' }}>
                    <Form.Group controlId="review">
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
                {this.updateState()}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default Review_Owner;
