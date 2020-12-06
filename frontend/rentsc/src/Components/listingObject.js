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

import townhouse from '../Images/townhouse.gif'
import townhouse1 from '../Images/townhouse1.png'
import townhouse2 from '../Images/townhouse2.jpg'

import apartment from '../Images/apartment.png'
import apartment2 from '../Images/apartment2.jpeg'



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
        this.propertyReview = "ReviewProperty"
        this.ownerReview = "ReviewOwner"
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
                tags = tags + " " + tag;
            }
        }
        return tags
    }
    renderListingImages(){
        var output = [];
        if(this.props.imageURL){
            for (var i = 0; i < this.props.imageURL.length; i++) {
                var image = this.props.imageURL[i];
                output.push(
                    <Carousel.Item interval={100000}>
                        <Image rounded style={{ maxWidth: "100%", maxHeight: "100%" }} src={image} />
                    </Carousel.Item>
                )
                
            }
        }
        else{
            output.push(
                <Carousel.Item interval={100000}>
                    <FontAwesomeIcon icon={faImage} style={{height: "100%", display: "block",
                        marginLeft: "auto", marginRight: "auto", paddingTop: "50px"}}/>
                </Carousel.Item>
            )
        }
        return output
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
            if (firebase.auth().currentUser.uid == uid) {
                user = true
            } else {
                user = false
            }
            return user
        }
        return (
            <div>

                <Container fluid style={{ paddingTop: "18px" }}>
                    <Row>
                        <Col>
                            <Carousel style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}>
                                {this.props.imageURL ? this.props.imageURL.map((image, idx) => {
                                    return (
                                        <Carousel.Item interval={5000}>
                                            <img
                                                src={image}
                                                style={{ height: '100%', width: "100%" }}
                                                className="d-block w-100"
                                                alt={idx}
                                                fluid="true" />
                                        </Carousel.Item>
                                    )
                                }) : this.props.tags['house'] ?

                                        <Carousel.Item interval={5000}>
                                            <img
                                                src={sampleHouse}
                                                style={{ height: '400px', width: "100%" }}
                                                className="d-block w-100"
                                                fluid="true"
                                            />
                                        </Carousel.Item>

                                        : this.props.tags['townhouse'] ?
                                            <Carousel.Item interval={5000}>
                                                <img
                                                    src={townhouse1}
                                                    style={{ height: '100%', width: "100%" }}
                                                    className="d-block w-100"
                                                    fluid="true"
                                                />
                                            </Carousel.Item>

                                            : this.props.tags['apartment'] ?
                                                <Carousel.Item interval={5000}>
                                                    <img
                                                        src={apartment}
                                                        style={{ height: '100%', width: "100%" }}
                                                        className="d-block w-100"
                                                        fluid="true"
                                                    />
                                                </Carousel.Item>
                                                : ''}


                                {this.props.tags['house'] && !this.props.imageURL ?
                                    <Carousel.Item interval={5000}>
                                        <img
                                            src={house2}
                                            style={{ height: '80%', width: "80%" }}
                                            className="d-block w-100"
                                            fluid="true"
                                        />
                                    </Carousel.Item>
                                    : ''}
                                {this.props.tags['house'] && !this.props.imageURL ?
                                    <Carousel.Item interval={5000}>
                                        <img
                                            src={house1}
                                            style={{ height: '100%', width: "100%" }}
                                            className="d-block w-100"
                                            fluid="true"
                                        />
                                    </Carousel.Item>
                                    : ''}

                                {this.props.tags['apartment'] && !this.props.imageURL ?
                                    <Carousel.Item interval={5000}>
                                        <img
                                            src={apartment2}
                                            style={{ height: '80%', width: "80%" }}
                                            className="d-block w-100"
                                            fluid="true"
                                        />
                                    </Carousel.Item>
                                    : ''}

                                {/* <Carousel.Item interval={100000} style={{ maxWidth: "100%", maxHeight: "100%" }}>
                                    <Image rounded style={{ maxWidth: "100%", maxHeight: "100%" }} src={this.props.imageURL ? this.props.imageURL : homeland} />
                                </Carousel.Item>
                                <Carousel.Item interval={100000}>
                                    <Image rounded style={{ maxWidth: "100%", maxHeight: "100%" }} src={this.props.imageURL ? this.props.imageURL : homeland_master} />
                                </Carousel.Item>
                                <Carousel.Item interval={100000}>
                                    <Image rounded style={{ maxWidth: "100%", maxHeight: "100%" }} src={this.props.imageURL ? this.props.imageURL : homeland_ceiling} />
                                </Carousel.Item> */}
                            </Carousel>
                        </Col>
                        <Col style={{ fontFamily: "sans-serif", position: "relative" }}>
                            <ListGroup variant="flush">
                                <ListGroup.Item style={{ fontSize: "18px" }}>{this.props.description}</ListGroup.Item>
                                <ListGroup.Item style={{ fontSize: "14px", fontWeight: "200" }}>{this.props.numBedrooms} bedrooms {this.props.numBaths} baths</ListGroup.Item>
                                <ListGroup.Item style={{ fontSize: "14px", fontWeight: "200" }}>{this.renderTags()}</ListGroup.Item>
                                <ListGroup.Item style={{ fontWeight: "bold", fontSize: "18px", textAlign: "right", position: "absolute", bottom: 0, right: 0 }}>${this.props.price} / month</ListGroup.Item>
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
                    {/*checkSameUser() ? '' : <Button variant="outline-success" onClick={() => this.handleR(this.props)} size="sm">Review {this.props.username} </Button>*/}

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