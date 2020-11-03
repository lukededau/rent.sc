import React from 'react'
import { Button } from 'react-bootstrap'
import firebase from '../firebase'

class User extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            firstname: "",
            lastname: "",
        };
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addUser = e => {
        e.preventDefault()

        const db = firebase.firestore()
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection("users").add({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email
        });

        this.setState({
            firstname: "",
            lastname: "",
            email: ""
        });
    }

    render() {
        return (
            <form onSubmit={this.addUser}>
                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    onChange={this.updateInput}
                    value={this.state.firstname}
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={this.updateInput}
                    value={this.state.lastname}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.updateInput}
                    value={this.state.email}
                />
                <Button type="submit">Submit</Button>
            </form>
        );
    }
}

export default User;