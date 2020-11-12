import React from 'react'
import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
import defaultProfileImage from '../Images/Default_profile_image.jpg'

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
class NavigationBar extends React.Component{
    render(){
        return(
            <div>
            <Navbar bg="dark" fixed="top" variant="dark">
                <Navbar.Brand href="login">rent.sc</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className = "mr-auto">
                        <Nav.Link href="#Nearby">Nearby</Nav.Link>
                        <Nav.Link href="#AddGuests">Add Guests</Nav.Link>
                        <Nav.Link href="#Rooms">Add Rooms</Nav.Link>
                        <Nav.Link href="#explore">Future Listings</Nav.Link>

                        
                    </Nav>
                        <Nav>
                        <Nav.Link href="create-listing">Create a Listing</Nav.Link>
                        <Nav.Link href="signUp">Create Account</Nav.Link>
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
                            <NavDropdown.Item href="#user/user-profile">Profile</NavDropdown.Item>
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

