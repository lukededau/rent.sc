import React from 'react'
import 'firebase/auth';
import  { Redirect } from 'react-router-dom'

import firebase from '../firebase.js';
import Message from './message.js'
import { FaDiceSix } from 'react-icons/fa';

async function getAllRooms(user_id){
    return new Promise(async(resolve, reject) => {
        //console.log('Initial');
        var res = [];
        var i = 0;
        var j = 0;
        const db = firebase.firestore();
        const room_ref = db.collection('userToRoom');
        
        const query_ref = room_ref.where('user_id', '==', user_id);
        const docs = await query_ref.get();
        var docs1 = "";
        if (docs.empty){
            //console.log("No matching doc");
            //console.log(user_id)
        }

        docs.forEach(async (doc) => {
            i = i + 1;
            var query_ref1 = room_ref.where('room_id', '==', doc.data()['room_id']);
            docs1 = await query_ref1.get();
            docs1.forEach(async(doc1) => {
                j = j + 1;
                //console.log(doc1.id, "=>", doc1.data()['user_id'])
                await doc1.data();
                if (doc1.data()['user_id'] !== user_id){
                    var dic = {"doc_id": doc1.id};
                    dic = Object.assign(dic, doc1.data());
                    res.push(dic);
                    //console.log("Length is")
                    //console.log(res.length)
                }
                //console.log(i +" vs " +(docs.size));
                //console.log(j +" vs " +(docs1.size));
                if ((i === docs.size) && (j === docs1.size)){
                    //console.log("returning response")
                    //console.log(res)
                    resolve(res);
                }
            })
    
    })
    })
}

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            isToggleOn: true,
            user_id: "",
            room_id: ""
        }
    }
    componentDidMount() {
        if((this.props.room_id != this.state.room_id) || this.state.room_id == ""){
            this.listener = firebase.auth().onAuthStateChanged(user => {
                if (!user) {
                    return () =>
                    {return <Redirect to='/listings'  />}
                } else {
                        this.setState({user_id: user.uid})  
                        var messages_stream = getAllRooms(this.state.user_id).then((messages)=>{
                        this.setState({ messages: messages });
                        this.setState({room_id: messages[0].room_id})
                        this.props.changeRoomIdState(this.state.room_id);
                    });     
    
                }
            })  

        }
    }

    componentWillUnmount() {
        this.listener();
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }
    renderRoom() {
        var output = [];

        for (var i = 0; i < this.state.messages.length; i++) {
            var message = this.state.messages[i];
            output.push(<Message {...message} />)
        }
        return output
    }


    render() {
        return(
            <div>
                {this.renderRoom()}
            </div>
        );
    }
}

export default MessageList
