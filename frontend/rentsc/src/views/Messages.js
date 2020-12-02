import React from 'react';
import NavigationBar from '../Components/navbar.js'
import MessageObject from '../Components/messageObject.js'
import MessageList from '../Components/messageList.js'

import 'bootstrap/dist/css/bootstrap.min.css';
/*

*/


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
        console.log("Changing state of room_id in Messages to ");
        this.setState({room_id: room_id})
    }

    render(){
        console.log("Rendering Messages")
        return(
            <div>
                <NavigationBar/>
                <div style={{paddingTop: "60px"}}>
                <div style={{width: "50%", display: "inline-block", paddingLeft: "30px"}}>    
                <MessageList room_id={this.state.room_id} changeRoomIdState={(room_id) => {this.changeRoomIdState(room_id)}}/>
                </div>
                <div style={{width: "40%", height: "100%", display: "inline-block"}}>
                <MessageObject room_id={this.state.room_id}/>      
                </div>
                </div>

            </div>
            
        );
    }
}
export default Messages;

