import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import firebase from '../firebase.js';
import NavigationBar from '../Components/navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css';

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
            tags: "",
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
            this.setState({
                zip: zip,
                description: description,
                numBaths: numBaths,
                numBedrooms: numBedrooms,
                price: price,
                size: size,
                tags: tags,
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
                        <h2>26, No fee rental, King studio</h2>
                    </Row>
                    <Row>
                        <h3>{this.state.price}</h3>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default MainListing
