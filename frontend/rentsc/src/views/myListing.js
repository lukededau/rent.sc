import React from 'react';
import NavigationBar from '../Components/navbar.js'
import MyListingList from '../Components/MylistingList.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../firebase'
import { Redirect } from 'react-router-dom'

class listing extends React.Component {
    checkLogin() {
        var login
        if(firebase.auth().currentUser != null) {
            login = true
        } else {
            login = false
        }
        return login
    }

    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>
                {this.checkLogin() ?
                    <div style={{ paddingTop: "60px" }}>
                        <div style={{ width: "50%", display: "inline-block" }}>
                            <MyListingList />
                        </div>
                    </div>
                : <Redirect to='/login'/> }
            </div>
        );
    }
}
export default listing

