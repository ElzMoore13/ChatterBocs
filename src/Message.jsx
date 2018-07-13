import React from 'react';

const Message = (props) =>{
    //display the message content and associtaed username
    return(<div className='message'>
              <span style={{color: props.color}} className='message-username'>
                {props.message.username}
              </span>
              <span className='message-content'>{
                props.message.content}
              </span>
           </div>);

}

module.exports = Message;
