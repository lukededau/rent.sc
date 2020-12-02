import React from 'react'
import 'firebase/auth';
import firebase from '../firebase.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import  { Redirect } from 'react-router-dom'
import MessageObject from './messageObject'

import defaultProfileImage from '../Images/Default_profile_image.jpg'


class Message extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: "0",
            room_id: this.props.room_id
        }
    }
    componentDidMount() {
        this.listener = firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                return () =>
                {return <Redirect to='/listings'  />}
            } else {
                console.log(user.uid)
                this.setState({user_id: user.uid})    
                console.log(this.props.room_id)
                this.setState({room_id: this.props.room_id})
            }
        })   
    }

    componentWillUnmount() {
        this.listener();
    }
    render(){
        return(
            <div>
            <Container fluid
                >
                    <Row onClick={() => console.log(this.props.room_id)}>
                        <Col sm={1}>
                            <Image src={defaultProfileImage} style={{height:"50px"}} roundedCircle />
                        </Col>
                        <Col sm={8}>
                            {this.props.user_id}
                        </Col>
                    </Row>
                </Container>
                <hr></hr>
            </div>
        );
    }
}
export default Message