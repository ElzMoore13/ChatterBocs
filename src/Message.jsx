import React, {Component} from 'react';

const Message = (props) =>{
    return(<div className="message">
              <span style={{color: props.color}} className="message-username">
                {props.message.username}
              </span>
              <span className="message-content">{
                props.message.content}
              </span>
           </div>);

}

module.exports = Message;
