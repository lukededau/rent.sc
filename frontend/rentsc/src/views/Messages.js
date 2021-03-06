import React from 'react';
import NavigationBar from '../Components/navbar.js'
import MessageObject from '../Components/messageObject.js'
import MessageList from '../Components/messageList.js'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';


class Messages extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            isToggleOn: true,
            user_id: "",
            room_id: ""
        }
    }

    changeRoomIdState(room_id){
        this.setState({room_id: room_id})
    }

    render(){
        function checkUser(){
            var user
            if(firebase.auth().currentUser != null) {
                user = true
            } else {
                user = false
            }
            return user
        }
        return(
            <div>
                <NavigationBar/>
                {checkUser() ? 
                    <Row id="MessageRow">
                        <Col id="MessageListCol" style={{paddingTop: "60px", paddingLeft: "15px"}}>  
                            <h2 style={{ paddingTop: "10px", paddingLeft: "250px" }}>Messages</h2>  
                            <MessageList room_id={this.state.room_id} changeRoomIdState={(room_id) => {this.changeRoomIdState(room_id)}}/>
                        </Col>
                        <Col id="MessageObjectCol" style={{height: "100%", display: "inline-block", paddingTop: "60px"}}>
                            <MessageObject room_id={this.state.room_id}/>      
                        </Col>
                    </Row> : this.props.history.push('/login')}
            </div>
            
        );
    }
}
export default withRouter(Messages);

