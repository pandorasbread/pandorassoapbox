import React, {useState, useEffect} from 'react'
import './Chat.css'
import Message from './Message'
import ChatHeader from './ChatHeader'
import AddCircleIcon from "@material-ui/icons/AddCircle"
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import { selectChannelId, selectChannelName } from './features/appSlice'
import db from "./Firebase"
import {Firestore, serverTimestamp} from "firebase/firestore"

function Chat() {

    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [messageInput, setInput] =  useState("");
    const [messages, setMessages] = useState([]);
    

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("channels").doc(channelId).collection("messages").add({
            timestamp: serverTimestamp(),
            message: messageInput,
            user: user,
            id: generateId()
        })

        setInput("");
    };

    useEffect(() => {
        if(channelId){
            db.collection("channels")
            .doc(channelId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => 
                setMessages(
                    snapshot.docs.map((doc) =>
                    doc.data()
                )
                )
            );
        }
    }, [channelId]);

    function deleteMessage(message) {
        var todelete = db.collection("channels").doc(channelId).collection("messages").where('id', '==', message.messageId);

        todelete.get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                doc.ref.delete();
            });
        })
    }

    function generateId() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    function editMessage(messageProps) {
        console.log("does nothing yet");
    }

  return (
    <div className='chat'>
        <ChatHeader channelName={channelName}/>
        <div className='chat__messages'>
            {messages.map((message) => (
                <Message user={message.user} timestamp = {message.timestamp} message = {message.message} key={message.id} id = {message.id} canDoThings= {message.user.uid === user.uid} onEdit={message => editMessage(message)} onDelete={message => deleteMessage(message)}/>
            ))}
        </div>
        <div className='chat__input'>
            <AddCircleIcon fontSize ="large"/>
            <form>
                <input placeholder={`Message #${channelName}`} value={messageInput} disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}/>
                <button type="submit" className='chat__inputButton' onClick={sendMessage} disabled={!channelId}>Send Message</button>

            </form>
                <div className='chat__inputIcons'>
                    
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            

        </div>
        
    </div>
  )
}

export default Chat