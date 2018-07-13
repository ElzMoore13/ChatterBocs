import React, {Component} from 'react';

const newId = require('uuid/v4');

const ChatBar = (props) => {

  //function calling on prop function to send message to WS server when the enter key is pressed in message content textarea (cannot be blank)
  const sendMessageUp = function(event){
    const username = document.getElementById('user').value
    if (event.key === 'Enter') {
      if(username.length > 0){
        const newMessageObject = {
          type: 'postMessage',
          id: newId(),
          username: username,
          content: event.target.value,
          color: props.currentUser.color,
        }
        event.target.value = '';
        props.sendMessage(newMessageObject);
      }
    }
  }

  //function calling on prop function to update the name stored in currentUser when name textarea is clicked off focus (name must not be blank, and cannot be equal to what it was before or no change will happen)
  const updateCurrUser = function(event) {
      const newName = document.getElementById('user').value;
      if(newName.length > 0 && newName != props.currentUser.name){
        const newMessageObject = {
          type: 'postNotification',
          id: newId(),
          content: `${props.currentUser.name} changed their name to ${newName}`
        }
        props.updateUser(newName, newMessageObject);
      }
  }

  return(
    <footer className="chatbar">
      <input onBlur={updateCurrUser} id='user' className="chatbarUsername" type='text' defaultValue={props.currentUser.name}/>
      <input onKeyDown={sendMessageUp} className="chatbarMessage" placeholder="Type a message and hit ENTER" />
    </footer>
  );

}

module.exports = ChatBar;
