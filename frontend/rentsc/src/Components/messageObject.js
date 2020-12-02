import React from 'react'
import 'firebase/auth';
import {ChatFeed, Message} from 'react-chat-ui'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import firebase from '../firebase.js';
import Message1 from './message.js'
import  { Redirect } from 'react-router-dom'


import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class MessageObject extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            senderName: "Jim Halpert",
            messagesInfo: [],
            messages: [
                new Message({
                  id: 1,
                  message: "I'm the recipient! (The person you're talking to)",
                }), // Gray bubble
                new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
              ],
            is_typing: false,
            time_stamp: "00:00",
            room_id: 0,
            user_id: 0
        }
    }
    componentDidMount() {
        console.log("Checking message object");
        if(this.props.room_id != this.state.room_id){
            console.log("In messageObject");
            console.log(this.props.room_id);
            console.log(this.state.room_id);
            this.listener = firebase.auth().onAuthStateChanged(user => {
                if (!user) {
                    return () =>
                    {return <Redirect to='/listings'  />}
                } else {
                    this.setState({user_id: user.uid})  
                    console.log(this.props)
                    this.setState({room_id: this.props.room_id})  
                    var messages_stream = this.getMessages(this.state.room_id).then((messages)=>{
                        this.setState({ messages: messages });
                    });     
    
                }
            })  
        }
              
    }
    componentDidUpdate(){
        if(this.props.room_id != this.state.room_id){
            console.log("In component did update for message object")
            this.setState({room_id: this.props.room_id});
           this.getMessages(this.state.room_id);
        }
    }
    componentWillUnmount() {
        this.listener();
    }
    async getMessages(){
        console.log("Getting messages")
        var res = []
        const db = firebase.firestore();
        console.log(this.props.room_id);
        const room_a_ref = db.collection('rooms').doc(this.props.room_id)
        const message_ref = room_a_ref.collection('messages')
        var docs = await message_ref.get() 
            
        docs.forEach((doc) => {
            console.log(doc.data())
            res.push(new Message({id: doc.data()['sender'], senderName: doc.data()['sender'],message: doc.data()['msg'], timestamp:doc.data()['time']}))
        });
        res.sort((a,b) => (a.time > b.time) ? 1: -1)
        console.log(res);
        this.setState({messages: res})
    }
    renderMessages(list){
        var output = [];
        //this.sortMessages();
        output.push(<ChatFeed
            messages={this.state.messages} // Array: list of message objects
            isTyping={this.state.is_typing} // Boolean: is the recipient typing
            hasInputField={false} // Boolean: use our input, or use your own
            showSenderName={true} // show the name of the user who sent the message
            bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
            // JSON: Custom bubble styles
            bubbleStyles={
            {
                text: {
                    fontSize: 30
                },
                chatbubble: {
                    borderRadius: 70,
                    padding: 40
                }
            }
            }
        />)
        return output;
    }

    render(){
        return(
            <div>
                {this.renderMessages()}
                <hr></hr>      
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Hoiii"
                        aria-label="Message box"
                        aria-describedby="basic-addon2"
                        />
                    <InputGroup.Append>
                        <Button>
                            <FontAwesomeIcon icon={faArrowCircleUp} style={{height: "100%"}}/>
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
}
export default MessageObject