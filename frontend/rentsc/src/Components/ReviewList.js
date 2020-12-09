import React from 'react'
import firebase from '../firebase'
import axios from 'axios'
import ReviewListObject from '../Components/ReviewListObject'

class ReviewList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/app/getOwnerReviews')
        .then((response) => {
            var reviewsList = []

            for(const i of response.data) {
                if(i.owner_uid == firebase.auth().currentUser.uid) {
                    reviewsList.push(i)
                }
            }
            this.setState({ reviews: reviewsList })
        })
    }

    renderListing() {
        var output = [];

        for (var i = 0; i < this.state.reviews.length; i++) {
            var review = this.state.reviews[i];
            output.push(<ReviewListObject {...review} />)
        }
        return output
    }

    render() {
        return(
            <div>
                <h4 style={{ paddingTop: "10px", paddingLeft: "18px" }}>My Reviews</h4>
                <br></br>
                {this.renderListing()}
            </div>
        )
    }
}

export default ReviewList