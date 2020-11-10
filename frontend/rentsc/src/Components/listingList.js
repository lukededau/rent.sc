import React from 'react'
import 'firebase/auth';
import ListingObject from './listingObject.js'
import axios from 'axios'



class ListingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listings: []
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/app/getAllListings')
            .then((response) => {
                console.log(response.data)
                var listing_stream = response.data;
                this.setState({ listings: listing_stream })
            })

    }
    renderListing() {
        var output = [];
        debugger;

        for (var i = 0; i < this.state.listings.length; i++) {
            var listing = this.state.listings[i];

            output.push(<ListingObject {...listing} />)
        }


        return output
    }

    render() {
        debugger;
        return (
            <div>
                <h2 style={{ paddingTop: "10px", paddingLeft: "15px" }}>Listings in Santa Cruz</h2>
                {this.renderListing()}
            </div>
        );
    }
}
export default ListingList