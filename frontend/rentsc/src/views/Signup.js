import React, { useRef } from 'react';
import {Form, Card, Button} from 'react-bootstrap';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-3">Signup</h2>
                    <Form>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Button className="w-100" type="submit">Signup</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? Login
            </div>
        </>
    )
}