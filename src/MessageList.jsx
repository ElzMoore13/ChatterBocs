import React from 'react';
import Message from './Message.jsx';
import Notification from './Notifications.jsx';

const makeMessage = (messages) => {

  //function to respectively render each message/notification component in array of messages
  const multiMessages = messages.map((message) =>{
    switch(message.type){
      case('incomingMessage'):
        return(<Message color={message.color} key={message.id} message={message} />)
      case('incomingNotification'):
        return(<Notification key={message.id} notification={message}/>)
      default:
        throw new Error(`did not recognize the event type... ${message.type}`)
    }
  })
  return multiMessages;
}


const MessageList = (props) => {
  return(<main className='messages'>
            {makeMessage(props.messages)}
            <div className='message system'>
            </div>
        </main>);



}

module.exports = MessageList;
