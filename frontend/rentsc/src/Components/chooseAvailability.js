import React from 'react'
import firebase from '../firebase.js'


class ChooseAvailability extends React.Component {
    constructor(props) {
        super(props);
        this.name = firebase.auth().currentUser.displayName;
    }

    render() {
        return (
            <div>
                <h1>Name: {this.name}</h1>
            </div>
        );
    }
}

export default ChooseAvailability