import React, {Component} from 'react';

class ChatBar extends Component{
  // to generate unique ids
  generateUniqueId(){
   const uniqueKey = (Math.random()*1000000000).toFixed(0);
   return uniqueKey;
  }

  sendMessageUp(event){
    if (event.keyCode == 13) {
      const newMessageObject = {
        id: this.generateUniqueId(),
        username: document.getElementById('user').value,
        content: event.target.value,
      }
      event.target.value = '';
      this.props.sendMessage(newMessageObject);
    } else {
      return false;
    }
  }
  render(){
    return(
      <footer className="chatbar">
        <input id='user' className="chatbarUsername" type='text' defaultValue={this.props.currentUser.name}/>
        <input onKeyDown={this.sendMessageUp.bind(this)} className="chatbarMessage" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }

}

module.exports = ChatBar;
