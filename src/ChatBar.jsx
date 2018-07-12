import React, {Component} from 'react';

const newId = require('uuid/v4');

const ChatBar = (props) => {

  const sendMessageUp = function(event){
    if (event.key === 'Enter') {
      const newMessageObject = {
        type: 'postMessage',
        id: newId(),
        username: document.getElementById('user').value,
        content: event.target.value,
        color: props.currentUser.color,
      }
      event.target.value = '';
      props.sendMessage(newMessageObject);
    } else {
      return false;
    }
  }

  const updateCurrUser = function(event) {
    if (event.key === 'Enter') {
      const newName = document.getElementById('user').value;
      const newMessageObject = {
        type: 'postNotification',
        id: newId(),
        content: `${props.currentUser.name} changed their name to ${newName}`
      }
      props.updateUser(newName, newMessageObject);
    } else {
      return false
    }
  }

  return(
    <footer className="chatbar">
      <input onKeyDown={updateCurrUser} id='user' className="chatbarUsername" type='text' defaultValue={props.currentUser.name}/>
      <input onKeyDown={sendMessageUp} className="chatbarMessage" placeholder="Type a message and hit ENTER" />
    </footer>
  );

}

module.exports = ChatBar;
