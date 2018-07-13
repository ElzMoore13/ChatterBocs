import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const randomColor = require('random-color');

// let idIncrementor = 3;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
          name: 'Anonymous',
          color: '#000',
        },
      messages: [],
      numUsers: 0,
    }

  }
  //
  addMessage(newMessage){
    this.socket.send(JSON.stringify(newMessage))
  }

  updateUser(newUser, newMessage){
    const newCurrUser = {
      name: newUser,
      color: this.state.currentUser.color,
    }
    this.setState({currentUser: newCurrUser})
    this.socket.send(JSON.stringify(newMessage))
    setTimeout(() => {
      console.log(this.state.currentUser)
    }, 1000)
  }

  updateMessages(newMessage){
    const oldMessages = this.state.messages;
    const updatedMessages = [...oldMessages, newMessage];

    this.setState({messages: updatedMessages})
  }


  componentDidMount() {
    console.log("componentDidMount <App />");

    // connect with websocket
    const newSocket = new WebSocket('ws://localhost:3001/');
    this.socket = newSocket;

    console.log('Connected to Server');


    //listen for broadcasted message from websocket server
    newSocket.onmessage = event => {

      const data = JSON.parse(event.data);

      //check type of message to handle accordingly
      switch(data.type){

        case('userAdded'):
          //update color and number of users displayed after new client connected
          this.setState({numUsers: data.num})
          const newCurrUser = {
            name: this.state.currentUser.name,
            color: data.color
          }
          this.setState({currentUser: newCurrUser})
          break;
        case('userLeft'):
          //update number of users displayed after client disconnect
          this.setState({numUsers: data.num})
          break;
        case('incomingMessage'):
          //add the message to the state.messages
          this.updateMessages(data);
          break;
        case('incomingNotification'):
          //add the notifications to the state.messages
          this.updateMessages(data);
          break;
        default:
          throw new Error(`did not recognize the event type...${data.type}`);
      }
    }

  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatter-Bocs</a>
          <span className='logo'>
            <img src='../styles/LeafPic.png'/>
          </span>
          <p className='onlineCount'>Users Online: {this.state.numUsers}</p>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar updateUser={this.updateUser.bind(this)} sendMessage={this.addMessage.bind(this)} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
