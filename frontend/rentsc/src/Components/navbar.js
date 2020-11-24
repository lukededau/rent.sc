import React from 'react'
import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
import defaultProfileImage from '../Images/Default_profile_image.jpg'
import { BsHouseDoor } from "react-icons/bs";
import { BsPersonPlus } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { HiViewList } from "react-icons/hi";
import { TiMessages } from "react-icons/ti";
import { GrFavorite } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { RiUserAddLine } from "react-icons/ri";
import { RiMenuAddFill } from "react-icons/ri";

import { GoSignOut } from "react-icons/go";


/*<NavDropdown 
                            title={
                                    <Image src={defaultProfileImage} style={{height:"25px"}}roundedCircle></Image>
                            }
                            id="collapsible-nav-dropdown"
                        >

                            <NavDropdown.Item href="#user/Messages">Messages</NavDropdown.Item>
                            <NavDropdown.Item href="#user/Favorites">Favorites</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#user/user-profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#user/sign-out">sign out</NavDropdown.Item>

                        </NavDropdown>
*/
class NavigationBar extends React.Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" fixed="top" variant="dark">
                    <Navbar.Brand href="login">rent.sc <BsHouseDoor /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#Nearby">Nearby <FaLocationArrow /></Nav.Link>
                            <Nav.Link href="#AddGuests">Add Guests <BsPersonPlus /></Nav.Link>
                            <Nav.Link href="#Rooms">Add Rooms <AiOutlinePlus /></Nav.Link>

                            <Nav.Link href="#explore">Future Listings  <HiViewList /></Nav.Link>


                        </Nav>
                        <Nav>
                        <Nav.Link href="create-listing" >Create a Listing</Nav.Link>
                        <Nav.Link href="signup">Create Account</Nav.Link>
                        <NavDropdown 
                            title={
                                    <Image src={defaultProfileImage} style={{height:"25px"}}roundedCircle></Image>
                            }
                            id="collapsible-nav-dropdown"
                            alignRight
                            flip="true"
                        >

                            <NavDropdown.Item href="#user/Messages">Messages</NavDropdown.Item>
                            <NavDropdown.Item href="#user/Favorites">Favorites</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="userprofile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#user/sign-out">Sign out</NavDropdown.Item>

                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar

