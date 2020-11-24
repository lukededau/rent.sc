import React from 'react'
import 'firebase/auth';
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import {
    BrowserRouter as Router,
    Link,
} from 'react-router-dom';
import PropertyReview from '/Users/Josue/Desktop/rent.sc/frontend/rentsc/src/views/propertyReview.js'
import Review_Owner from '/Users/Josue/Desktop/rent.sc/frontend/rentsc/src/views/ownerReview';

import homeland from '../Images/tiananmen_square.jpeg'
import homeland_master from '../Images/tiananmen_square_master.jpg'
import homeland_ceiling from '../Images/tiananmen_square_ceiling.jpeg'
// import { string } from 'prop-types';

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
        }
        this.propertyReview = "ReviewProperty"
        this.ownerReview = "ReviewOwner"
    }
    handleC(p) {
        // var l = <PropertyReview pr={p} />
        this.setState(state => ({
            showPropertyReview: !state.showPropertyReview
        }));
        this.setState(state => ({
            showOwnerReview: false
        }));
        // <PropertyReview/>
        // console.log(l)
    }
    handleR(p) {
        // var l = <PropertyReview {...p} />
        this.setState(state => ({
            showOwnerReview: !state.showOwnerReview
        }));
        this.setState(state => ({
            showPropertyReview: false
        }));
        // <PropertyReview/>
        // console.log("lol", l)
    }

    renderPropertyReview(p) {
        console.log("p", p)
        var l = <PropertyReview {...p} />
        console.log("L:", l)
        return l
    }

    renderOwnerReview(p) {
        console.log("p", p)
        var l = <Review_Owner {...p} />
        console.log("L:", l)
        return l
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

    render() {
        return (
            <div>

                <Container fluid
                    style={{ paddingTop: "60px" }}
                >
                    <Row>
                        <Col>
                            <Carousel style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}>
                                <Carousel.Item interval={100000} style={{ maxWidth: "100%", maxHeight: "100%" }}>
                                    <Image rounded style={{ maxWidth: "100%", maxHeight: "100%" }} src={homeland} />
                                </Carousel.Item>
                                <Carousel.Item interval={100000}>
                                    <Image rounded style={{ maxWidth: "100%", maxHeight: "100%" }} src={homeland_master} />
                                </Carousel.Item>
                                <Carousel.Item interval={100000}>
                                    <Image rounded style={{ maxWidth: "100%", maxHeight: "100%" }} src={homeland_ceiling} />
                                </Carousel.Item>
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
                    <Button variant="outline-info" onClick={() => this.handleC(this.props)} size="sm">review place  {this.props.address}</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button variant="outline-success" onClick={() => this.handleR(this.props)} size="sm">review owner {this.props.username} </Button>

                    <div>
                        {this.state.showPropertyReview ? this.renderPropertyReview(this.props) : ''}
                        {this.state.showOwnerReview ? this.renderOwnerReview(this.props) : ''}
                    </div>


                </Container>
                <hr></hr>
            </div >

        );
    }
}
export default ListingObject