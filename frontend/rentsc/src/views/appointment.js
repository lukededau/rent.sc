import React from 'react';
import NavigationBar from '../Components/navbar';
import ChooseAvailability from '../Components/chooseAvailability'

class appointment extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <div style={{ paddingTop: "90px" }}>
                    <ChooseAvailability />
                </div>
            </div>
        );
    }
}

export default appointment;
