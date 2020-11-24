import React from 'react';
import NavigationBar from '../Components/navbar';
import CreateAppointment from '../Components/CreateAppointment';

class ScheduleAppointment extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <div style={{ paddingTop: "100px" }}>
                    <CreateAppointment />
                </div>
            </div>
            
        );
    }
}

export default ScheduleAppointment;