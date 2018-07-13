import React, {Component} from 'react';

const Message = (props) =>{
    //display the message content and associtaed username 
    return(<div className="message">
              //use the color associated with user
              <span style={{color: props.color}} className="message-username">
                {props.message.username}
              </span>
              <span className="message-content">{
                props.message.content}
              </span>
           </div>);

}

module.exports = Message;
