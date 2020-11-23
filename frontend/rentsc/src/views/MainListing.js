import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Carousel, Image, Badge, Card, Button } from 'react-bootstrap';
import { BsStar, BsGeoAlt, BsFillPersonFill, BsCursorFill, BsStarFill, BsCalendar } from 'react-icons/bs';
import firebase from '../firebase.js';
import NavigationBar from '../Components/navbar.js';
import Sample1 from '../Images/tiananmen_square_ceiling.jpeg';
import Sample2 from '../Images/tiananmen_square_master.jpg';
import Sample3 from '../Images/tiananmen_square.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';

const subtitleStyle = {
    paddingTop: 16,
    fontSize: 24,
    color: "gray",
}

class MainListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: this.props.location.state.selectedAddress,
            city: this.props.location.state.selectedCity,
            description: "",
            email: "",
            numBaths: "",
            numBedrooms: "",
            price: "",
            size: "",
            tags: [],
            zip: ""
        }
    }

    componentDidMount() {
        this._queryListing();
    }

    _queryListing = async() => {
        const db = firebase.firestore();
        const listings = await db.collection('listing').where("address", "==", this.state.address).where("city", "==", this.state.city).get();
        listings.forEach((listing) => {
            const {zip, description, numBaths, numBedrooms, price, size, tags, email} = listing.data();

            // Create tag string
            var verifiedTags = [];
            Object.keys(tags).forEach(function (key) {
                if (tags[key]) {
                    verifiedTags.push(key);
                }
            })

            this.setState({
                zip: zip,
                description: description,
                numBaths: numBaths,
                numBedrooms: numBedrooms,
                price: price,
                size: size,
                tags: verifiedTags,
                email: email,
            });
        });
    }

    render() {
        return (
            <div>
                <div style={{height: "58.5px", marginBottom: "20px"}}>
                    <NavigationBar />
                </div>
                <Container>
                    <Row>
                        <Col md={3}>
                            <h2 style={{fontSize: 40}}>${this.state.price}<span style={{fontSize: 16}}>/month</span> <Badge style={{fontSize: 20}} variant="primary">New</Badge></h2>
                        </Col>
                        <Col>
                            <h1 style={subtitleStyle}>{this.state.numBedrooms} bd | {this.state.numBaths} ba | {this.state.size} sq ft</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5><BsGeoAlt />{this.state.address}, {this.state.city}, CA {this.state.zip}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Carousel style={{height: 500, width: "100%", marginTop: 8}}>
                            <Carousel.Item>
                                <Image style={{height: 500, width: "100%"}}
                                className="d-block w-100"
                                src={Sample1}
                                alt="First slide"
                                fluid
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img style={{height: 500, width: "100%"}}
                                className="d-block w-100"
                                src={Sample2}
                                alt="Third slide"
                                fluid
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img style={{height: 500, width: "100%"}}
                                className="d-block w-100"
                                src={Sample3}
                                alt="Third slide"
                                fluid
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Row>
                    <Row style={{marginTop: 16}}>
                        <Col md={2}>
                            <h2>Overview</h2>
                        </Col>
                        <Col md={{span: 8}}>
                            <p style={{marginTop: 8}}>
                                Tags: {this.state.tags.map(tag => (
                                    <Badge key={tag} style={{fontSize: 16, marginRight: 4}} variant="success">{tag}</Badge>
                                ))}
                            </p>
                        </Col>
                        <Col>
                            <Button style={{marginTop: 2}}>Make An Appointment <BsCalendar /></Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>{this.state.description}</p>
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                            <Card style={{height: "100%", width: "100%"}}>
                                <Card.Header style={{fontSize: 20}}><b>Contact</b> <BsFillPersonFill /></Card.Header>
                                <Card.Body>
                                    <Card.Title>Bob Lin</Card.Title>
                                    <Card.Text>
                                        Email: {this.state.email}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{height: "100%", width: "100%"}}>
                                <Card.Header style={{fontSize: 20}}><b>Travel</b> <BsCursorFill /></Card.Header>
                                <Card.Body>
                                    <Card.Title>Bus</Card.Title>
                                    <Card.Text>
                                        Takes X minutes to the nearest bus stop
                                    </Card.Text>
                                    <Card.Title>Car</Card.Title>
                                    <Card.Text>
                                        Takes X minutes to UC Santa Cruz
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{height: "100%", width: "100%"}}>
                                <Card.Header style={{fontSize: 20}}><b>Ratings</b> <BsStarFill /></Card.Header>
                                <Card.Body>
                                    <Card.Title><BsStar style={{marginBottom: 4}} /> 1.52</Card.Title>
                                    <Card.Text>
                                        This place is so awesome that I am going to stay here for the rest of my life
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default MainListing