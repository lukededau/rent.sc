import React from 'react'
import firebase from '../firebase.js'
import { Alert, Button } from 'react-bootstrap';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


function ChooseAlert(props) {

    // Creates 2 documents for landlord/user
    async function onButtonClick() {
        await uploadAppointment(props.landlordID, props.renterID, props.renterName, props.renterEmail, props.listing, props.date);
        await uploadAppointment(props.renterID, props.landlordID, props.landlordName, props.landlordEmail, props.listing, props.date);

        window.location.href='/userprofile';
    }

    const firstName = props.landlordName.split(" ")[0];
    
    if (props.isDateAvailable == null) {
        return <Alert variant="secondary">No date has been selected.</Alert>
    }
    else if (props.isDateAvailable === "error") {
        return <Alert variant="secondary">{firstName} has not provided any availability at this time. Please message {firstName} to start setting up an appointment.</Alert>
    }
    else if (props.isDateAvailable === true) {
        return (
            <div>
                <Alert variant="success">{firstName} is available on {props.date}.</Alert>
                <Button onClick={onButtonClick}>Schedule Appointment</Button>
            </div>
        )
    }
    else {
        return <Alert variant="danger">{firstName} is not available on {props.date}. Please select a different date.</Alert>
    }
}

async function uploadAppointment(userID, contactID, contactName, contactEmail, listing, date) {
    const db = firebase.firestore();
    const appointmentRef = db.collection('appointment');

    const appointment = {
        firstName: contactName.split(" ")[0],
        lastName: contactName.split(" ")[1],
        date: date,
        uid: contactID,
        email: contactEmail,
        listing: listing,
        index: 0,
    };
    var doc = await appointmentRef.doc(userID).get();
    if (doc.exists) {
        const appointmentData = doc.data();
        const keys = Object.keys(appointmentData);
        const nextKey = Number(keys[keys.length - 1]) + 1;
        var formattedAppointment = {};
        formattedAppointment[nextKey] = appointment;
        formattedAppointment[nextKey]["index"] = nextKey;
        const updateRes = await appointmentRef.doc(userID).update(formattedAppointment);
        console.log(updateRes);
    }
    else {
        const updateRes = await appointmentRef.doc(userID).set({0: appointment});
        console.log(updateRes);
    }
}

class CreateAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: firebase.auth().currentUser.uid,
            email: firebase.auth().currentUser.email,
            username: firebase.auth().currentUser.displayName,
            availableDate: null,
            date: null,
        };
        this.landlordID = props.landlordID;
        this.landlordName = props.landlordName;
        this.landlordEmail = props.landlordEmail;
        this.listing = props.listing;

        this.onClickDay = this.onClickDay.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(value) {
        var date = String(value);
        var brokenDate = date.split(" ");
        brokenDate[2] = brokenDate[2] + ","
        return brokenDate.splice(1, 3).join(" ");
    }

    async onClickDay(value) {
        this.state.date = this.formatDate(value);
        const db = firebase.firestore();
        const availabilityRef = db.collection('availability')

        var availability = null;
        const doc = await availabilityRef.doc(this.landlordID).get();
        if (doc.exists) {
            availability = doc.data();
            if (this.state.date in availability["availableDates"]) {
                this.state.availableDate = true;
            }
            else {
                this.state.availableDate = false;
            }
        }
        else {
            this.state.availableDate = "error";
        }
        this.setState(this.state);
    }

    render() {
        return (
            <div>
                <h5 style={{paddingLeft: "20px", paddingBottom: "15px"}}>Choose a date to schedule an appointment:</h5>
                <div style={{float: "left", paddingLeft: "20px"}}>
                    <Calendar 
                        onClickDay={this.onClickDay}
                        allowPartialRange={true}
                    />
                </div>
                <div style={{float: "left", paddingLeft: "20px"}}>
                    <ChooseAlert 
                        isDateAvailable={this.state.availableDate} 
                        date={this.state.date} 
                        renterName={this.state.username}
                        renterID={this.state.uid}
                        renterEmail={this.state.email}
                        landlordName={this.landlordName}
                        landlordID={this.landlordID}
                        landlordEmail={this.landlordEmail}
                        listing={this.listing}
                    />
                </div>
            </div>
        );
    }
}

export default CreateAppointment