import React, {Component} from 'react';
import Message from './Message.jsx';

function makeMessage(messages) {
  const multiMessages = messages.map((message) =>{
    return(<Message key={message.id} message={message} />)
  })
  return multiMessages;
}

class MessageList extends Component{
  render() {
    return(<main className='messages'>{makeMessage(this.props.messages)} <div className='message system'> </div> </main>);
  }

}

module.exports = MessageList;
