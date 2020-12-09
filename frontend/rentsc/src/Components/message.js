import React from 'react'
import 'firebase/auth';
import firebase from '../firebase.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import  { Redirect } from 'react-router-dom'

import defaultProfileImage from '../Images/Default_profile_image.jpg'


class Message extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: "0",
            room_id: this.props.room_id,
            firstname: "",
            lastname: ""
        }
    }
    componentDidMount() {
        this.listener = firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                return () =>
                {return <Redirect to='/listings'  />}
            } else {
                console.log(this.props)
                this.setState({user_id: user.uid})    
                this.setState({room_id: this.props.room_id})
                this.setState({firstname: this.props.firstname})
                this.setState({lastname: this.props.lastname})
            }
        })   
    }
    onClick(){
        this.props.onClick(this.props.room_id);
    }
    componentWillUnmount() {
        this.listener();
    }
    renderFullName(){
        var fullname = this.state.firstname + " " + this.state.lastname;
        return fullname
    }
    render(){
        return(
            <div>
            <Container>
                    <Row onClick={() => this.onClick()}>
                        <Col md={2}>
                            <Image src={defaultProfileImage} style={{height:"50px"}} roundedCircle />
                        </Col>
                        <Col md={8}>
                            {this.renderFullName()}
                        </Col>
                    </Row>
            </Container>
            <hr></hr>
            </div>
        );
    }
}
export default Message