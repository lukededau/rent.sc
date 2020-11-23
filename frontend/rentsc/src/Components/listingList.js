import React from 'react'
import 'firebase/auth';
import ListingObject from './listingObject.js'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';
// import Button from 'react-bootstrap/Button'
import { GrSort } from 'react-icons/gr';
import { GiMoneyStack } from "react-icons/gi";
import { BiBed } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";

class ListingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listings: [],
            isToggleOn: true

        }
        this.sortPrice = this.sortPrice.bind(this);
        this.sortBedrooms = this.sortBedrooms.bind(this);
        this.sortTenents = this.sortTenents.bind(this);
        this.sortDogsFriendly = this.sortDogsFriendly.bind(this);
        this.sortCatFriendly = this.sortCatFriendly.bind(this);
        this.handleClick = this.handleClick.bind(this);

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

    renderListing(list) {
        var output = [];
        // debugger;

        // console.log("response", this.state.listings)
        for (var i = 0; i < this.state.listings.length; i++) {
            var listing = this.state.listings[i];

            output.push(<ListingObject {...listing} />)
        }


        return output
    }


    render() {
        // debugger;
        return (
            <div>
                <h2 style={{ paddingTop: "10px", paddingLeft: "15px" }}>Listings in Santa Cruz</h2>

                <div>

                    {/* <Button variant="outline-dark" onClick={() => this.unCheck()}>Dog Friendly</Button> */}
                </div>

                <div style={{ width: "100%", paddingLeft: "15px", display: "table" }}>

                    <div style={{ display: "table-row", height: "100 %" }}>
                        <div style={{ backgroundColor: "", display: "table-cell" }}>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                                    Sort By  <GrSort />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={this.sortPrice} href="#/SortByPrice">Price <GiMoneyStack /></Dropdown.Item>
                                    <Dropdown.Item onClick={this.sortBedrooms} href="#/SortByBedrooms">Bedrooms <BiBed /></Dropdown.Item>
                                    <Dropdown.Item onClick={this.sortTenents} href="#/SortByTenants">Number of Tenants <IoIosPeople /></Dropdown.Item>
                                    <Dropdown.Item onClick={this.sortDogsFriendly} href="#/SortByDogFriendly">Dog Friendly <FaDog /></Dropdown.Item>
                                    <Dropdown.Item onClick={this.sortCatFriendly} href="#/SortByCatFriendly">Cat Friendly <FaCat /></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                    </div>




                </div>

                {this.renderListing()}
            </div >
        );
    }
}

export default ListingList
