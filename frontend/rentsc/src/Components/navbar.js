import React from 'react'
import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
import defaultProfileImage from '../Images/Default_profile_image.jpg'
import { BsHouseDoor } from "react-icons/bs";
// import { BsPersonPlus } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";
import { HiViewList } from "react-icons/hi";
import { TiMessages } from "react-icons/ti";
// import { GrLogout } from "react-icons/gr";
// import { CgProfile } from "react-icons/cg";
// import { RiUserAddLine } from "react-icons/ri";
// import { RiMenuAddFill } from "react-icons/ri";
// import { GoSignOut } from "react-icons/go";
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';
import { RiStarFill } from "react-icons/ri";



class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let u
        function checkFunction() {
            var user = firebase.auth().currentUser
            var state
            if (user != null) {
                u = firebase.auth().currentUser.displayName
                state = true
            } else {
                state = false
            }
            return state
        }

        return (
            <div>
                <Navbar bg="dark" fixed="top" variant="dark">

                    <Navbar.Brand href="listings">rent.sc <BsHouseDoor /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/#Nearby">Nearby <FaLocationArrow /></Nav.Link>
                            {checkFunction() ? <Nav.Link href="myfavorites">Favorites <RiStarFill /></Nav.Link> : ''}
                            {checkFunction() ? <Nav.Link href="myListings">My Listings  <HiViewList /></Nav.Link> : ''}


                        </Nav>
                        <Nav>
                            {checkFunction() ? <Nav.Link href="create-listing">Create Listing</Nav.Link> : ''}
                            {checkFunction() ? <Nav.Link href="view-appointments">Appointments</Nav.Link> : ''}
                            {checkFunction() ? '' : <Nav.Link href="login">Login</Nav.Link>}

                            {checkFunction() ? <NavDropdown
                                title={
                                    <Image src={defaultProfileImage} style={{ height: "25px" }} roundedCircle></Image>
                                }
                                id="collapsible-nav-dropdown"
                                alignRight
                                flip="true"
                            >

                                <NavDropdown.Item href="messages">Messages</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="userprofile">{u} </NavDropdown.Item>
                                <NavDropdown.Item href='#logout'>Logout </NavDropdown.Item>
                            </NavDropdown> : ''}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(NavigationBar)

