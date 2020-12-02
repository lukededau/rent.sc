import React from 'react';
import NavigationBar from '../Components/navbar';
import CreateAppointment from '../Components/CreateAppointment';

class ScheduleAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.landlordID = props.history.location.landlordID;
        this.landlordName = props.history.location.landlordName;
        this.landlordEmail = props.history.location.landlordEmail;
        this.listing = props.history.location.listing;
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <div style={{ paddingTop: "100px" }}>
                    <CreateAppointment 
                        landlordID={this.landlordID} 
                        landlordEmail={this.landlordEmail}
                        landlordName={this.landlordName}
                        listing={this.listing}
                    />
                </div>
            </div>
            
        );
    }
}

export default ScheduleAppointment;