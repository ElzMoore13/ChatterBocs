import React, {Component} from 'react';
import Message from './Message.jsx';

const makeMessage = (messages) => {
  const multiMessages = messages.map((message) =>{
    return(<Message key={message.id} message={message} />)
  })
  return multiMessages;
}


const MessageList = (props) => {
  return(<main className='messages'>{makeMessage(props.messages)} <div className='message system'> </div> </main>);


}

module.exports = MessageList;
