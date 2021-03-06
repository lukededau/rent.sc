import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from "react-icons/fi";
import NavigationBar from '../Components/navbar';
import firebase from '../firebase'


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            if(firebase.auth().currentUser != null) {
                history.push('/listings')
            }
        } catch {
            setError("Failed to login")
        }
    }

    return (
        <>
            <NavigationBar></NavigationBar>
            <Card style={{paddingTop: '100px'}}>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form style={{ paddingLeft: "15px", paddingRight: "15px" }} onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Login <FiLogIn /></Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign up</Link>
            </div>
        </>
    )
}