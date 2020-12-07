import React from 'react';
import NavigationBar from '../Components/navbar.js'
import MyFavListingList from '../Components/MyFavlistingList.js'
import 'bootstrap/dist/css/bootstrap.min.css';

class listing extends React.Component {
    render() {

        return (
            <div>
                <NavigationBar></NavigationBar>

                <div style={{ paddingTop: "60px" }}>
                    <div style={{ width: "50%", display: "inline-block" }}>
                        <MyFavListingList />
                    </div>
                </div>

            </div>
        );
    }
}
export default listing

