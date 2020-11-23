import React from 'react';
import NavigationBar from '../Components/navbar';
import AppointmentCards from '../Components/AppointmentCards';

class ViewAppointments extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <div style={{ paddingTop: "100px" }}>
                    <AppointmentCards />
                </div>
            </div> 
        );
    }
}

export default ViewAppointments;