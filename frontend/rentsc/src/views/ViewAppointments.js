import React from 'react';
import NavigationBar from '../Components/navbar';
import AppointmentCards from '../Components/AppointmentCards';
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'

class ViewAppointments extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        async function checkUser() {
            let login
            await firebase.auth().onAuthStateChanged((user) => {
                if(user) {
                    login = true
                } else {
                    login = false
                }
            })
            //console.log(login)
            return login
        }
        return (
            <div>
                <NavigationBar></NavigationBar>
                {checkUser() ?
                <div style={{ paddingTop: "100px" }}>
                    <AppointmentCards />
                </div> : this.props.push.history('/login')}
            </div> 
        );
    }
}

export default withRouter(ViewAppointments);