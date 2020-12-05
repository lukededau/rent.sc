import React from 'react'
import 'firebase/auth';
import {ChatFeed, Message} from 'react-chat-ui'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import firebase from '../firebase.js';
import  { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form';


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
            user_id: 0,
            inputMsg: ""
        }
    }
    handleSubmit(event){
        event.preventDefault();
        const submit = event.currentTarget;
        if(submit.elements[0].value.length >= 0){
            this.sendMessage(submit.elements[0].value)
        }
    }
    componentDidMount() {
        console.log("Checking message object");
        if(this.props.room_id != this.state.room_id){
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
            this.setState({room_id: this.props.room_id});
           this.getMessages(this.state.room_id);
        }
    }
    componentWillUnmount() {
        this.listener();
    }
    async getMessages(){
        var res = []
        var res1 = []
        var resTime = []
        const db = firebase.firestore();
        const room_a_ref = db.collection('rooms').doc(this.props.room_id)
        const message_ref = room_a_ref.collection('messages')
        var docs = await message_ref.get() 
        
        docs.forEach((doc) => {
            console.log(doc.data())
            res.push({id: doc.data()['sender'], senderName: doc.data()['sender'],message: doc.data()['msg'], time_stamp: doc.data()['time']})
        });
        console.log(res)
        res.sort((a,b) => (new Date(a.time_stamp) - new Date(b.time_stamp)))
        console.log(res);
        for (var i = 0; i < res.length; i++){
            res1.push(new Message({id: res[i]['id'], senderName: res[i]['senderName'],message: res[i]['message'], time_stamp: res[i]['time_stamp']}))
        }
        this.setState({messages: res})
    }
    async sendMessage(inputM){
        debugger
        const db = firebase.firestore();
        var data = {
            'sender': this.state.user_id,
            'room_id': this.props.room_id,
            'msg': inputM,
            'time': (new Date()).toString()
        }
        var newMsgRef = db.collection('rooms').doc(this.props.room_id)
        newMsgRef.collection('messages').doc().set(data)
    }
    renderMessages(list){
        var output = [];
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
                    fontSize: 15
                },
                chatbubble: {
                    borderRadius: 35,
                    padding: 20
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
                <Form onSubmit={(event) => this.handleSubmit(event)}>
                    <InputGroup className="mb-3" controlId="msg">
                        <FormControl
                            placeholder="Hoiii"
                            aria-label="Message box"
                            aria-describedby="basic-addon2"
                            inputRef={(ref) => {this.setState({inputMsg: ref})}}
                            type="text"
                            />
                        <InputGroup.Append>
                            <Button variant="primary" type="submit">
                                <FontAwesomeIcon icon={faArrowCircleUp} style={{height: "100%"}}/>
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>  
            </div>
        );
    }
}
export default MessageObject