import React, {useEffect} from 'react';
import firebaseObj from '../firebase.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'firebase/auth';

class Signup extends React.Component {

    handleSubmit(event){
        const form = event.currentTarget;
        this.createUser(form.elements.formBasicEmail.value, form.elements.formBasicPassword.value,
            form.elements.formFirstName.value + " " + form.elements.formLastName.value)

        
    }
    componentWillMount(){
        this.listener = firebaseObj.auth().onAuthStateChanged(user => {
            if (!user) {
            } else {
            }
        })
    }
    componentWillUnmount(){
        this.listener();
    }
    
    createUser(email, password, displayName){
        firebaseObj.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
            return result.user.updateProfile({
              displayName: displayName
            })
          }).catch(function(error) {
            console.log(error);
          });
    }
    render(){
   
        return (
            <div>
            <Form onSubmit={(event) => this.handleSubmit(event)}>
            <Form.Group controlId="formFirstName">
                <Form.Label>
                    First Name
                </Form.Label>
                <Form.Control type="text" placeholder="First name"/>
            </Form.Group>
            <Form.Group controlId="formLastName">
                <Form.Label>
                    Last Name
                </Form.Label>
                <Form.Control type="text" placeholder="Last name"/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else, but EVBallsofSteal420(whaatpenguin).
            </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
            </Form>
            </div>
        )
    }
    
}

export default Signup;