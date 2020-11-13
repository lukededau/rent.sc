import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

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

    //console.log("displayName: " + currentUser.displayName + " uid: " + currentUser.uid)

    return (
        <>
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
            </div>
        </>
    )
}
