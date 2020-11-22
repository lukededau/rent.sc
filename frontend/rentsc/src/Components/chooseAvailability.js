import React from 'react'
import firebase from '../firebase.js'
import { Button, ListGroup } from 'react-bootstrap';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const ListItem = ({value}) => (
    <ListGroup.Item>{value}</ListGroup.Item>
);

const List = ({dates}) => (
    <ListGroup>
        {
            Object.keys(dates).map((date, none) => <ListItem value={date}/>)
        }
    </ListGroup>
);

class ChooseAvailability extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availableDates: {},
        }
        this.state.uid = firebase.auth().currentUser.uid;
        this.state.email = firebase.auth().currentUser.email;
        this.state.username = firebase.auth().currentUser.displayName;

        this.onClickDay = this.onClickDay.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    formatDate(value) {
        var date = String(value);
        var brokenDate = date.split(" ");
        brokenDate[2] = brokenDate[2] + ","
        return brokenDate.splice(1, 3).join(" ");
    }

    onClickDay(value) {
        const date = this.formatDate(value);
        if (date in this.state.availableDates) {
            delete this.state.availableDates[date];
        }
        else {
            let copyState = this.state;
            copyState.availableDates[date] = null;
            this.setState(copyState);
        }
        this.setState(this.state);
    }

    async onButtonClick() {
        const db = firebase.firestore();
        const res = await db.collection('availability').doc().set(this.state);
        console.log(res);
        window.location.href='/userprofile';
    }

    render() {
        return (
            <div>
                <div style={{float: "left", paddingLeft: "20px"}}>
                    <Calendar 
                        onClickDay={this.onClickDay}
                        allowPartialRange={true}
                    />
                    <div style={{float: "left", paddingTop: "20px"}}>
                        <Button onClick={this.onButtonClick}>
                            Submit Dates
                        </Button>
                    </div>
                </div>
                <div style={{float: "left", paddingLeft: "20px"}}>
                    <h2>Selected Dates:</h2>
                    <List dates={this.state.availableDates}/>
                </div>
            </div>
        );
    }
}

export default ChooseAvailability