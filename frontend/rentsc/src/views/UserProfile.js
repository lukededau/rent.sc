import React, { useState } from 'react'
import { Card, Button, Alert, Container, Col, Row } from 'react-bootstrap'
import NavigationBar from '../Components/navbar'
import { useAuth } from '../Contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import UserListing from '../Components/UserListing'
import firebase from '../firebase'
import MyListingList from '../Components/MylistingList.js'

export default function UserProfile() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [name, setName] = useState("")
    
    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to logout")
        }
    }

    async function getFirstName() {
        var fName
        const db = firebase.firestore()
        const userRef = db.collection('users').where('uid', '==', currentUser.uid)

        await userRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                if(doc.exists) {
                    const data = doc.data()
                    fName = data.firstname
                }
            })
        })
        setName(fName)
    }

    function renderName() {
        getFirstName()
        //console.log(name)
    }

    return (
        <>
        <NavigationBar></NavigationBar>
        <Container style={{paddingTop:'100px'}}>
            <Row>
                <Col sm={4}>
                    <Card className='text-center'>
                        <Card.Img variant='top'></Card.Img>
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {renderName()}
                            <strong> Hi, I'm {name} </strong>
                            <div></div>
                            {/*<strong> {currentUser.email} </strong>*/}
                        </Card.Body>
                    </Card>
                    <br></br>
                    <Card className='text-center'>
                        <Card.Body>
                            <Button variant="link" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={8}>
                    <MyListingList></MyListingList>
                </Col>
            </Row>
        </Container>
        </>
    )
}
