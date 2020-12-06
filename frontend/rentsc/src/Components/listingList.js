import React from 'react'
import 'firebase/auth';
import ListingObject from './listingObject.js'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';

import { GiMoneyStack } from "react-icons/gi";
import { BiBed } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import { MdSmokeFree } from "react-icons/md";

class ListingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listings: [],
            isToggleOn: true,
            priceChecked: false,
            bedroomsChecked: false,
            tenantsChecked: false,
            dogChecked: false,
            catChecked: false,
            apartment: false,
            house: false,
            townhouse: false,
            entirePlace: false,
            sharedRoom: false,
            privateRoom: false

        }
        this.sortPrice = this.sortPrice.bind(this);
        this.sortBedrooms = this.sortBedrooms.bind(this);
        this.sortTenents = this.sortTenents.bind(this);
        this.sortDogsFriendly = this.sortDogsFriendly.bind(this);
        this.sortCatFriendly = this.sortCatFriendly.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.sortApartment = this.sortApartment.bind(this);
        this.sortHouse = this.sortHouse.bind(this);
        this.sortEntirePlace = this.sortEntirePlace.bind(this);
        this.sortSharedRoom = this.sortSharedRoom.bind(this);
        this.sortPrivateRoom = this.sortPrivateRoom.bind(this);
        this.sortFurnished = this.sortFurnished.bind(this);
        this.sortPool = this.sortPool.bind(this);
        this.sortFireplace = this.sortFireplace.bind(this);
        this.sortAC = this.sortAC.bind(this);
        this.sortSmokerFriendly = this.sortSmokerFriendly.bind(this);
        this.sortStreetParking = this.sortStreetParking.bind(this);
        this.sortParkingSpots = this.sortParkingSpots.bind(this);

        this.handlePriceCheck = this.handlePriceCheck.bind(this);
        this.handleBedroomsCheck = this.handleBedroomsCheck.bind(this);
        this.handleTenantsCheck = this.handleTenantsCheck.bind(this);
        this.handleDogCheck = this.handleDogCheck.bind(this);
        this.handleCatCheck = this.handleCatCheck.bind(this);
        this.handleApartment = this.handleApartment.bind(this);
        this.handleHouse = this.handleHouse.bind(this);
        this.handleTownhouse = this.handleTownhouse.bind(this);
        this.handleEntirePlace = this.handleEntirePlace.bind(this);
        this.handleSharedRoom = this.handleSharedRoom.bind(this);
        this.handlePrivateRoom = this.handlePrivateRoom.bind(this);
        this.handleFurnished = this.handleFurnished.bind(this);
        this.handlePool = this.handlePool.bind(this);
        this.handleFireplace = this.handleFireplace.bind(this);
        this.handleAC = this.handleAC.bind(this);
        this.handleSmokerFriendly = this.handleSmokerFriendly.bind(this);
        this.handleStreetParking = this.handleStreetParking.bind(this);
        this.handleParkingSpots = this.handleParkingSpots.bind(this);

    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/app/getAllListings')
            .then((response) => {
                var listing_stream = response.data;
                this.setState({ listings: listing_stream })
            })

    }

    sortPrice() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (this.state.listings[k].price > this.state.listings[k + 1].price) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortTenents() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (this.state.listings[k].size < this.state.listings[k + 1].size) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortBedrooms() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (Number(this.state.listings[k].numBedrooms) < Number(this.state.listings[k + 1].numBedrooms)) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortBathrooms() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (Number(this.state.listings[k].numBaths) < Number(this.state.listings[k + 1].numBaths)) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortParkingSpots() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (Number(this.state.listings[k].parkingSpots) < Number(this.state.listings[k + 1].parkingSpots)) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortDogsFriendly() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.dogFriendly) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortCatFriendly() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.catFriendly) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortApartment() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.apartment) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortHouse() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.house) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortTownhouse() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.townhouse) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortEntirePlace() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.entirePlace) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortSharedRoom() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.sharedRoom) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortPrivateRoom() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.privateRoom) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortFurnished() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.furnished) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortPool() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.pool) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortFireplace() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.fireplace) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortAC() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.AC) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortStreetParking() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.streetParking) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    sortSmokerFriendly() {
        var tempList = this.state.listings
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.smokerFriendly) {
                    var temp1 = tempList[k]
                    tempList[k] = tempList[k + 1]
                    tempList[k + 1] = temp1
                    this.setState(state => ({ listings: tempList }))
                }
            }
        }
    }

    handleCheck() {
        this.setState(state => ({
            checked: !state.checked
        }));
    }

    handlePriceCheck() {
        this.setState(state => ({
            priceChecked: !state.priceChecked
        }));
        this.sortPrice();
    }

    handleBedroomsCheck() {
        this.setState(state => ({
            bedroomsChecked: !state.bedroomsChecked
        }));
        this.sortBedrooms();
    }

    handleTenantsCheck() {
        this.setState(state => ({
            tenantsChecked: !state.tenantsChecked
        }));
        this.sortTenents();
    }

    handleDogCheck() {
        this.setState(state => ({
            dogChecked: !state.dogChecked
        }));
        this.sortDogsFriendly();
    }

    handleCatCheck() {
        this.setState(state => ({
            catChecked: !state.catChecked
        }));
        this.sortCatFriendly();
    }

    handleApartment() {
        this.setState(state => ({
            apartment: !state.apartment
        }));
        this.sortApartment();
    }

    handleHouse() {
        this.setState(state => ({
            house: !state.house
        }));
        this.sortHouse();
    }

    handleTownhouse() {
        this.setState(state => ({
            townhouse: !state.townhouse
        }));
        this.sortTownhouse();
    }

    handleEntirePlace() {
        this.setState(state => ({
            entirePlace: !state.entirePlace
        }));
        this.sortEntirePlace();
    }

    handleSharedRoom() {
        this.setState(state => ({
            sharedRoom: !state.sharedRoom
        }));
        this.sortSharedRoom();
    }

    handlePrivateRoom() {
        this.setState(state => ({
            privateRoom: !state.privateRoom
        }));
        this.sortPrivateRoom();
    }

    handleFurnished() {
        this.setState(state => ({
            furnished: !state.furnished
        }));
        this.sortFurnished();
    }

    handlePool() {
        this.setState(state => ({
            pool: !state.pool
        }));
        this.sortPool();
    }

    handleFireplace() {
        this.setState(state => ({
            fireplace: !state.fireplace
        }));
        this.sortFireplace();
    }

    handleAC() {
        this.setState(state => ({
            AC: !state.AC
        }));
        this.sortAC();
    }

    handleStreetParking() {
        this.setState(state => ({
            streetParking: !state.streetParking
        }));
        this.sortStreetParking();
    }

    handleSmokerFriendly() {
        this.setState(state => ({
            smokerFriendly: !state.smokerFriendly
        }));
        this.sortSmokerFriendly();
    }

    handleParkingSpots() {
        this.setState(state => ({
            parkingSpots: !state.parkingSpots
        }));
        this.sortParkingSpots();
    }

    renderListing(list) {
        var output = [];

        for (var i = 0; i < this.state.listings.length; i++) {
            var listing = this.state.listings[i];
            output.push(<ListingObject {...listing} />)
        }

        return output
    }

    render() {
        return (
            <div>
                <h2 style={{ paddingTop: "10px", paddingLeft: "15px" }}>Listings in Santa Cruz</h2>

                <div style={{ width: "100%", paddingLeft: "15px", display: "table" }}>

                    <div style={{ display: "table-row", height: "100 %" }}>
                        <div style={{ backgroundColor: "", display: "table-cell" }}>

                            <text>Sort By: </text>
                            <br></br>
                            <ButtonGroup toggle size="sm" className="mb-2">


                                <ToggleButton type="checkbox" variant="outline-dark" checked={this.state.priceChecked} onChange={this.handlePriceCheck} value="1">
                                    Price <GiMoneyStack />
                                </ToggleButton>
                                <ToggleButton type="checkbox" variant="outline-dark" checked={this.state.bedroomsChecked} onChange={this.handleBedroomsCheck} value="1">
                                    Bedrooms <BiBed />
                                </ToggleButton>
                                <ToggleButton type="checkbox" variant="outline-dark" checked={this.state.tenantsChecked} onChange={this.handleTenantsCheck} value="1">
                                    Tenants <IoIosPeople />
                                </ToggleButton>


                            </ButtonGroup>
                            <br></br>

                            <label> Rental Type: </label> <br></br>
                            <ButtonGroup toggle size="sm" className="mb-2">

                                <ToggleButton type="checkbox" variant="outline-dark" checked={this.state.apartment} onChange={this.handleApartment} value="1">
                                    Apartment
                                </ToggleButton>
                                <ToggleButton type="checkbox" variant="outline-dark" checked={this.state.house} onChange={this.handleHouse} value="1">
                                    House
                                </ToggleButton>
                                <ToggleButton type="checkbox" variant="outline-dark" checked={this.state.townhouse} onChange={this.handleTownhouse} value="1">
                                    Townhouse
                                </ToggleButton>
                            </ButtonGroup>
                            <br></br>
                            <label> Type of Place: </label> <br></br>
                            <ButtonGroup toggle size="sm" className="mb-2">

                                <ToggleButton type="checkbox" variant="outline-dark" checked={this.state.entirePlace} onChange={this.handleEntirePlace} value="1">
                                    Entire Place
                                </ToggleButton>
                                <ToggleButton type="checkbox" variant="outline-dark" checked={this.state.sharedRoom} onChange={this.handleSharedRoom} value="1">
                                    Shared Room
                                </ToggleButton>
                                <ToggleButton type="checkbox" variant="outline-dark" checked={this.state.privateRoom} onChange={this.handlePrivateRoom} value="1">
                                    Private Room
                                </ToggleButton>
                            </ButtonGroup>

                            <br></br>

                            <div className="mb-2">

                                <Dropdown drop={'right'}>
                                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" >
                                        Amenities
                                </Dropdown.Toggle>
                                    <Dropdown.Menu >
                                        <Dropdown.Item onClick={this.sortParkingSpots}>Parking on Premise</Dropdown.Item>
                                        <Dropdown.Item onClick={this.sortStreetParking}>Street Parking</Dropdown.Item>
                                        <Dropdown.Item onClick={this.sortAC}>Air Conditioner</Dropdown.Item>
                                        <Dropdown.Item onClick={this.sortFurnished}>Furnished</Dropdown.Item>
                                        <Dropdown.Item onClick={this.sortFireplace}>Fireplace</Dropdown.Item>
                                        <Dropdown.Item onClick={this.sortPool}>Pool</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={this.sortDogsFriendly}>Dog Friendly <FaDog /></Dropdown.Item>
                                        <Dropdown.Item onClick={this.sortCatFriendly}>Cat Friendly <FaCat /></Dropdown.Item>
                                        <Dropdown.Item onClick={this.sortSmokerFriendly}>Smoker Friendly <MdSmokeFree /></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                        </div>

                    </div>
                </div>
                {this.renderListing()}
            </div >
        );
    }
}

export default ListingList
