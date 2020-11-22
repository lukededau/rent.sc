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
            dates.map((date) => <ListItem value={date}/>)
        }
    </ListGroup>
);

class ChooseAvailability extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availableDates: [],
        }
        this.name = firebase.auth().currentUser.displayName;

        this.onClickDay = this.onClickDay.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(value) {
        var date = String(value);
        var brokenDate = date.split(" ");
        brokenDate[2] = brokenDate[2] + ","
        return brokenDate.splice(1, 3).join(" ");
    }

    onClickDay(value) {
        const date = this.formatDate(value);
        const index = this.state.availableDates.indexOf(date);
        if (index > -1) {
            this.state.availableDates.splice(index, 1);
        }
        else {
            this.state.availableDates.push(date);
        }
        this.setState(this.state);
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
                        <Button>
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