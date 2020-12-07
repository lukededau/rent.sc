import React from 'react';
import Home from './Home.js'
import NavigationBar from '../Components/navbar.js'
import ListingList from '../Components/listingList.js'
import 'bootstrap/dist/css/bootstrap.min.css';

class listing extends React.Component {
    render() {
        //document.body.style.overflow = 'hidden'; // disable pagewise scroll
        return (
            <div>
                <NavigationBar></NavigationBar>
                <div style={{ paddingTop: "60px" }}>
                    <div style={{ width: "50%", display: "inline-block" }}>
                        <ListingList />
                    </div>
                    <div style={{ top: "60px", position: "fixed", width: "50%", display: "inline-block" }}>
                        <Home />
                    </div>

                </div>

            </div>

        );
    }
}
export default listing

