import React, { useRef, useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import NavigationBar from '../Components/navbar'
import { useAuth } from '../Contexts/AuthContext'
import { /*Link,*/ useHistory } from 'react-router-dom'

export default function UserProfile() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to logout")
        }
    }

    function createListing() {
        history.push("/create-listing")
    }

    function viewAppointments() {
        history.push("/view-appointments")
    }

    //console.log("current user: " + currentUser.uid)

    return (
        <>
        <NavigationBar></NavigationBar>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Name: </strong> {currentUser.displayName}
                    <div></div>
                    <strong>Email: </strong> {currentUser.email}
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>
                    Logout
                </Button>
                <div>
                    <Button onClick={createListing}>
                        Create Listing
                    </Button>
                </div>
                <div style={{paddingTop: "15px"}}>
                    <Button onClick={viewAppointments}>
                        Open Appointments
                    </Button>
                </div>
            </div>
        </>
    )
}
