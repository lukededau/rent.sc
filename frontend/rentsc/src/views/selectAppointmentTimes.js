import React from 'react';
import NavigationBar from '../Components/navbar';
import ChooseAvailability from '../Components/chooseAvailability'

class selectAppointmentTimes extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <div style={{ paddingTop: "100px" }}>
                    <ChooseAvailability />
                </div>
            </div>
        );
    }
}

export default selectAppointmentTimes;
