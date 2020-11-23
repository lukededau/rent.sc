import React from 'react'
import firebase from '../firebase.js'
import { Card, Button } from 'react-bootstrap';


const AppointmentCard = ({value, remove}) => (
    <div style={{paddingLeft: "20px", paddingBottom: "15px", float: "left"}}>
        <Card style={{ width: '25rem' }}>
            <Card.Body>
                <Card.Title>{value.firstName} {value.lastName}</Card.Title>
                <Card.Text>
                    Proposed date: {value.date} <br></br>
                    Email: {value.email}
                </Card.Text>
                <Button>Contact {value.firstName} {value.lastName}</Button>
                <Button style={{ float: "right" }} variant="danger">
                    Remove
                </Button>
            </Card.Body>
        </Card>
    </div>
)


const Cards = ({appointments, remove}) => (
    <div>
        {
            appointments.map((appointment) => <AppointmentCard value={appointment} remove={remove}/>)
        }
    </div>
);


function CreateCards(props) {
    if (props.appointments != null) {
        return (
            <Cards appointments={props.appointments} remove={onRemoveClick}/>
        )
    }
    else {
        return (
            <div></div>
        )
    }

    async function onRemoveClick(values) {
        const FieldValue = firebase.firestore.FieldValue;
        const db = firebase.firestore();
        const appointmentRef = db.collection('appointment');
        const doc = await appointmentRef.doc(values.uid).get();
        if (doc.exists) {
            var temp = {};
            temp[values.index] = FieldValue.delete();
            const res = await appointmentRef.doc(values.uid).update(
                temp
            );
            console.log(res);
        }
    }
}


class AppointmentCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: firebase.auth().currentUser.uid,
            email: firebase.auth().currentUser.email,
            username: firebase.auth().currentUser.displayName,
        };
    }

    componentDidMount() {
        this.getAppointmentData();
    }

    async getAppointmentData() {
        this.allAppointments = [];
        const db = firebase.firestore();
        const appointmentRef = db.collection('appointment');
        const doc = await appointmentRef.doc(this.state.uid).get();
        const responses = [];
        responses.push(new Promise(async (resolve) => {
            if (doc.exists) {
                const appointmentData = doc.data();
                for (let key in appointmentData) {
                    this.allAppointments.push(appointmentData[key]);
                }
            }
            resolve();
        }));
        Promise.all(responses).then(() => {
            this.setState({
                appointments: this.allAppointments
            });
        });
    }

    render() {
        return (
            <div>
                <h2 style={{paddingLeft: "20px", paddingBottom: "15px"}}>
                    Open Appointments
                </h2>
                <CreateCards appointments={this.state.appointments}/>
            </div>
        );
    }
}

export default AppointmentCards
