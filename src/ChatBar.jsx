import React, {Component} from 'react';

const ChatBar = (props) => {
  // to generate unique ids
  const generateUniqueId = function(){
   const uniqueKey = (Math.random()*1000000000).toFixed(0);
   return uniqueKey;
 }

  const sendMessageUp = function(event){
    if (event.key === 'Enter') {
      const newMessageObject = {
        id: generateUniqueId(),
        username: document.getElementById('user').value,
        content: event.target.value,
      }
      event.target.value = '';
      props.sendMessage(newMessageObject);
    } else {
      return false;
    }
  }

  return(
    <footer className="chatbar">
      <input id='user' className="chatbarUsername" type='text' defaultValue={props.currentUser.name}/>
      <input onKeyDown={sendMessageUp} className="chatbarMessage" placeholder="Type a message and hit ENTER" />
    </footer>
  );

}

module.exports = ChatBar;
