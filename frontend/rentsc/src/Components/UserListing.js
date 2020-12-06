import React, { useState } from 'react'
import firebase from '../firebase'
import { Container, Card } from 'react-bootstrap'

function UserListing() {
    const [listings, setListings] = useState([])

    const uid = firebase.auth().currentUser.uid
    const db = firebase.firestore()
    const listingRef = db.collection('listing').where('uid', '==', uid)

    async function getListings() {
        const list = []
        await listingRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                if(doc.exists) {
                    const data = doc.data()
                    list.push(data)
                }
            })
        })
        //console.log('getlistings', list)
        setListings(list)
    }

    function renderList(){
        getListings()
        //console.log(listings)
    }

    return (
        <>
            <div>
                {renderList()}
            </div>
        </>
    )
}

/*
class UserListing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listings: [],
            address: '',
            city: '',
            description: '',
            images: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.getData = this.getData.bind(this)
        //this.renderList = this.renderList.bind(this)
    }

    async componentDidMount() {
        var listings = []
        const uid = firebase.auth().currentUser.uid
        const db = firebase.firestore()
        const listingRef = db.collection('listing').where('uid', '==', uid)

        await listingRef.get().then((snapshot) => {
            const list = []
            snapshot.forEach((doc) => {
                const data = doc.data()
                list.push(data)
            })
            listings = list
            this.state.listings = list
        })
        this.getData(this.state.listings)
        console.log('mounted')
    }

    getData(listings) {
        console.log('data: ', listings)

        this.state.listings.map((listing) => {
            return <li>{listing.address}</li>
        })
    }

    render() {
        console.log('render')
        return(
            <Container class='content'>
                {console.log('return')}
            </Container>
        )
    }
}
*/

export default UserListing