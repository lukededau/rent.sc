import React from 'react'
import 'firebase/auth';
import ListingObject from './listingObject.js'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button'
import { useState, ToggleButton, ButtonGroup } from 'react';


class ListingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listings: []
        }
        this.sortPrice = this.sortPrice.bind(this);
        this.sortBedrooms = this.sortBedrooms.bind(this);
        this.sortTenents = this.sortTenents.bind(this);
        this.sortDogsFriendly = this.sortDogsFriendly.bind(this);
        this.sortCatFriendly = this.sortCatFriendly.bind(this);

    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/app/getAllListings')
            .then((response) => {
                // console.log(response.data)
                var listing_stream = response.data;
                this.setState({ listings: listing_stream })
            })

    }
    sortPrice() {
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (this.state.listings[k].price > this.state.listings[k + 1].price) {
                    var temp = this.state.listings[k]
                    this.state.listings[k] = this.state.listings[k + 1]
                    this.state.listings[k + 1] = temp
                }
            }
        }
    }

    sortTenents() {
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (this.state.listings[k].size < this.state.listings[k + 1].size) {
                    var temp = this.state.listings[k]
                    this.state.listings[k] = this.state.listings[k + 1]
                    this.state.listings[k + 1] = temp
                }
            }
        }
    }

    sortBedrooms() {
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (Number(this.state.listings[k].numBedrooms) < Number(this.state.listings[k + 1].numBedrooms)) {
                    var temp = this.state.listings[k]
                    this.state.listings[k] = this.state.listings[k + 1]
                    this.state.listings[k + 1] = temp
                }
            }
        }
    }

    sortBathrooms() {
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (Number(this.state.listings[k].numBaths) < Number(this.state.listings[k + 1].numBaths)) {
                    var temp = this.state.listings[k]
                    this.state.listings[k] = this.state.listings[k + 1]
                    this.state.listings[k + 1] = temp
                }
            }
        }
    }

    sortDogsFriendly() {
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.dogFriendly) {
                    var temp = this.state.listings[k]
                    this.state.listings[k] = this.state.listings[k + 1]
                    this.state.listings[k + 1] = temp
                }
            }
        }
    }

    sortCatFriendly() {
        for (var j = 0; j < this.state.listings.length; j++) {
            for (var k = 0; k < this.state.listings.length - j - 1; k++) {

                if (!this.state.listings[k].tags.catFriendly) {
                    var temp = this.state.listings[k]
                    this.state.listings[k] = this.state.listings[k + 1]
                    this.state.listings[k + 1] = temp
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

                <div style={{ width: "30%", paddingLeft: "15px", display: "table" }}>
                    {/* <Button variant="outline-dark">Dark</Button>
                    <>
                        <ButtonGroup toggle className="mb-2">
                            <ToggleButton type="checkbox" variant="secondary" checked={checked} value="1"
                                onChange={(e) => setChecked(e.currentTarget.checked)}> Checked
                        </ToggleButton>
                        </ButtonGroup>
                    </> */}
                    <div style={{ display: "table-row", height: "100 %" }}>
                        <div style={{ backgroundColor: "", display: "table-cell" }}>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                                    Sort By
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={this.sortPrice} href="#/SortByPrice">Price</Dropdown.Item>
                                    <Dropdown.Item onClick={this.sortBedrooms} href="#/SortByBedrooms">Bedrooms</Dropdown.Item>
                                    <Dropdown.Item onClick={this.sortTenents} href="#/SortByTenants">Number of Tenents</Dropdown.Item>
                                    <Dropdown.Item onClick={this.sortDogsFriendly} href="#/SortByDogFriendly">Dog Friendly</Dropdown.Item>
                                    <Dropdown.Item onClick={this.sortCatFriendly} href="#/SortByCatFriendly">Cat Friendly</Dropdown.Item>
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
