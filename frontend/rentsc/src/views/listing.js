import React from 'react';
import Home from './Home.js'
import NavigationBar from '../Components/navbar.js'
import ListingList from '../Components/listingList.js'
import 'bootstrap/dist/css/bootstrap.min.css';

class listing extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>
                <div id="listingContainer"style={{ paddingTop: "60px" }}>
                    <div id="listingList" style={{ width: "50%", display: "inline-block" }}>
                        <ListingList />
                    </div>
                    <div id="listingMap" style={{ top: "60px", position: "fixed", width: "50%", display: "inline-block" }}>
                        <Home />
                    </div>

                </div>

            </div>

        );
    }
}
export default listing

