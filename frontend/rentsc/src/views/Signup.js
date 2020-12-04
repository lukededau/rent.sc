import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import NavigationBar from '../Components/navbar'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const { /*currentUser,*/ signup } = useAuth()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, firstNameRef.current.value, lastNameRef.current.value)
            history.push("/userprofile")
        } catch {
            setError("Failed to signup")
        }
        setLoading(false)
    }

    return (
        <>
            <NavigationBar></NavigationBar>
            <Card style={{paddingTop: '100px'}}>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}             
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="firstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="string" ref={firstNameRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="lastname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="string" ref={lastNameRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Signup</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </>
    )
}