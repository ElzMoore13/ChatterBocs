import React, {Component} from 'react';

const newId = require('uuid/v4');

const ChatBar = (props) => {

  const sendMessageUp = function(event){
    if (event.key === 'Enter') {
      const newMessageObject = {
        id: newId(),
        username: document.getElementById('user').value,
        content: event.target.value,
      }
      event.target.value = '';
      props.sendMessage(newMessageObject);
    } else {
      return false;
    }
  }

  const updateCurrUser = function(event) {
    if (event.key === 'Enter') {
      props.updateUser(document.getElementById('user').value)
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
