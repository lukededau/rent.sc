import React from 'react'
import 'firebase/auth';
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import firebase from '../firebase'

import PropertyReview from '../views/propertyReview.js'
import Review_Owner from '../views/ownerReview';

import sampleHouse from '../Images/sampleHouse.gif'
import house1 from '../Images/house1.gif'
import house2 from '../Images/house2.png'

// import townhouse from '../Images/townhouse.gif'
import townhouse1 from '../Images/townhouse1.png'
// import townhouse2 from '../Images/townhouse2.jpg'

import apartment from '../Images/apartment.png'
import apartment2 from '../Images/apartment2.jpeg'

import { RiStarLine, RiStarFill } from "react-icons/ri";
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import { reference } from '@popperjs/core';

class ListingObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            address: "",
            price: 0,
            numBaths: 0,
            size: "",
            numBedrooms: "",
            tags: {},
            reviews: [],
            index: 0,
            showPropertyReview: false,
            showOwnerReview: false,
            imageURL: []
        }

        this.favorited = {
            fav: false,
        }

        this.propertyReview = "ReviewProperty"
        this.ownerReview = "ReviewOwner"
    }

    componentDidMount() {
        this.checkFavorited();
    }

    _saveFavorite = async () => {

        const ref = await firebase.firestore().collection('users').where("email", "==", firebase.auth().currentUser.email).get()
        const reference = await firebase.firestore().collection('users').where("email", "==", firebase.auth().currentUser.email).where("favorites", "array-contains", this.props.address).get()
        if (!reference.empty) {
            await firebase.firestore().collection('users').doc(ref.docs[0].id).update({ 'favorites': firebase.firestore.FieldValue.arrayRemove(this.props.address) })
        }
        else {
            await firebase.firestore().collection('users').doc(ref.docs[0].id).update({ 'favorites': firebase.firestore.FieldValue.arrayUnion(this.props.address) })
        }
        this.checkFavorited();
        this.setState(this.state);
    }

    checkFavorited = async () => {
        if(firebase.auth().currentUser != null) {
            const ref = await firebase.firestore().collection('users').where("email", "==", firebase.auth().currentUser.email).where("favorites", "array-contains", this.props.address).get()
            this.favorited['fav'] = !ref.empty;
        }
        this.setState(this.state);
    }

    handleC(p) {

        this.setState(state => ({
            showPropertyReview: !state.showPropertyReview
        }));
        this.setState(state => ({
            showOwnerReview: false
        }));
    }

    handleR(p) {

        this.setState(state => ({
            showOwnerReview: !state.showOwnerReview
        }));
        this.setState(state => ({
            showPropertyReview: false
        }));
    }

    renderPropertyReview(p) {
        var toRender = <PropertyReview {...p} />
        return toRender
    }

    renderOwnerReview(p) {
        var toRender = <Review_Owner {...p} />
        return toRender
    }

    renderTags() {
        var tags = "";

        for (const tag in this.props.tags) {
            if (this.props.tags[tag] === true) {
                // tags = tags + " " + tag;
                if (tag === 'dogFriendly') {
                    tags = tags.concat(", Dog Friendly")
                }
                if (tag === 'catFriendly') {
                    tags = tags.concat(", Cat Friendly")
                }
                if (tag === 'apartment') {
                    tags = tags.concat(", Apartment")
                }
                if (tag === 'house') {
                    tags = tags.concat(", House")
                }
                if (tag === 'townhouse') {
                    tags = tags.concat(", Townhouse")
                }
                if (tag === 'entirePlace') {
                    tags = tags.concat(", Entire Place")
                }
                if (tag === 'sharedRoom') {
                    tags = tags.concat(", Shared Room")
                }
                if (tag === 'privateRoom') {
                    tags = tags.concat(", Private Room")
                }
                if (tag === 'furnished') {
                    tags = tags.concat(", Furnished")
                }
                if (tag === 'pool') {
                    tags = tags.concat(", Pool")
                }
                if (tag === 'fireplace') {
                    tags = tags.concat(", Fireplace")
                }
                if (tag === 'streetParking') {
                    tags = tags.concat(", Street Parking")
                }
                if (tag === 'smokerFriendly') {
                    tags = tags.concat(", Smoker Friendly")
                }
                if (tag === 'AC') {
                    tags = tags.concat(", AC")
                }
            }
        }
        // tags = tags.substring(2)
        if (tags) {
            tags = tags.slice(2)
        }
        return tags
    }
    render() {
        function checkLoggedIn() {

            let login
            if (firebase.auth().currentUser != null) {
                login = true
            } else {
                login = false
            }
            return login
        }

        function checkSameUser(uid) {
            let user
            if (firebase.auth().currentUser.uid === uid) {
                user = true
            } else {
                user = false
            }
            return user
        }
        return (
            <div>

                <Container id="listingObjectContainer" fluid style={{ paddingTop: "18px" }}>
                    <Row>
                        <Col xs={6}>
                            <Carousel style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}>
                                {this.props.imageURL ? this.props.imageURL.map((image, idx) => {
                                    return (
                                        <Carousel.Item interval={5000}>
                                            <img
                                                src={image}
                                                style={{ height: '200px', width: "250px" }}
                                                className="d-block w-100"
                                                alt={idx}
                                                fluid="true" />
                                        </Carousel.Item>
                                    )
                                }) : this.props.tags['house'] ?

                                        <Carousel.Item interval={5000}>
                                            <img
                                                src={sampleHouse}
                                                style={{ height: '200px', width: "250px" }}
                                                className="d-block w-100"
                                                fluid="true"
                                                alt="sampleHouse"
                                            />
                                        </Carousel.Item>

                                        : this.props.tags['townhouse'] ?
                                            <Carousel.Item interval={5000}>
                                                <img
                                                    src={townhouse1}
                                                    style={{ height: '200px', width: "250px" }}
                                                    className="d-block w-100"
                                                    fluid="true"
                                                    alt="sample townhouse"
                                                />
                                            </Carousel.Item>

                                            : this.props.tags['apartment'] ?
                                                <Carousel.Item interval={5000}>
                                                    <img
                                                        src={apartment}
                                                        style={{ height: '200px', width: "250px" }}
                                                        className="d-block w-100"
                                                        fluid="true"
                                                        alt="sample apartment"
                                                    />
                                                </Carousel.Item>
                                                : ''}


                                {this.props.tags['house'] && !this.props.imageURL ?
                                    <Carousel.Item interval={5000}>
                                        <img
                                            src={house2}
                                            style={{ height: '200px', width: "250px" }}
                                            className="d-block w-100"
                                            fluid="true"
                                            alt="sample house 2"
                                        />
                                    </Carousel.Item>
                                    : ''}
                                {this.props.tags['house'] && !this.props.imageURL ?
                                    <Carousel.Item interval={5000}>
                                        <img
                                            src={house1}
                                            style={{ height: '200px', width: "250px" }}
                                            className="d-block w-100"
                                            fluid="true"
                                            alt="sample house 2"
                                        />
                                    </Carousel.Item>
                                    : ''}

                                {this.props.tags['apartment'] && !this.props.imageURL ?
                                    <Carousel.Item interval={5000}>
                                        <img
                                            src={apartment2}
                                            style={{ height: '200px', width: "250px" }}
                                            className="d-block w-100"
                                            fluid="true"
                                            alt="sample apartment 2"
                                        />
                                    </Carousel.Item>
                                    : ''}
                            </Carousel>
                        </Col>
                        <Col xs={6} style={{ fontFamily: "sans-serif", position: "relative" }}>
                            <ListGroup variant="flush">
                                <ListGroup.Item style={{ fontSize: "18px" }}>{this.props.description}</ListGroup.Item>
                                <ListGroup.Item style={{ fontSize: "14px", fontWeight: "200" }}>{this.props.numBedrooms} bedrooms {this.props.numBaths} baths</ListGroup.Item>
                                <ListGroup.Item style={{ fontSize: "14px", fontWeight: "200" }}>{this.renderTags()}</ListGroup.Item>
                                <ListGroup.Item style={{ fontWeight:'bold', textAlign: 'right', fontSize: '18px'}}>${this.props.price} / month</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <br></br>


                    {checkLoggedIn() ?
                        checkSameUser(this.props.uid) ? '' : <Button variant="outline-info" onClick={() => this.handleC(this.props)} size="sm">Review {this.props.address}</Button>
                        : <Button variant="outline-info" size="sm" href='login'>Login to review</Button>}
                    &nbsp;&nbsp;&nbsp;

                    {checkLoggedIn() ?
                        checkSameUser(this.props.uid) ? '' : <Button variant="outline-success" onClick={() => this.handleR(this.props)} size="sm">Review {this.props.username} </Button>
                        : ''}
                    &nbsp;&nbsp;&nbsp;

                    {checkLoggedIn() ?
                        checkSameUser(this.props.uid) ? '' :
                            <ButtonGroup toggle >
                                <ToggleButton type="checkbox" variant="outline-warning" checked={this.favorited.fav} onClick={() => this._saveFavorite(this.props)} size="sm">
                                    Favorite {this.favorited.fav ? <RiStarFill /> : <RiStarLine />}
                                </ToggleButton>
                            </ButtonGroup>
                        : ''}

                    <div>
                        {this.state.showPropertyReview ? this.renderPropertyReview(this.props) : ''}
                        {this.state.showOwnerReview ? this.renderOwnerReview(this.props) : ''}
                    </div>

                    {() => this.handleC(this.props)}
                </Container>
                <hr></hr>
            </div >

        );
    }
}
export default ListingObject