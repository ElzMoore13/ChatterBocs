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


  componentDidMount() {
    console.log("componentDidMount <App />");

    const newSocket = new WebSocket('ws://localhost:3001/');
    this.socket = newSocket;
    console.log('Connected to Server');

    newSocket.onmessage = event => {

      const data = JSON.parse(event.data);

      switch(data.type){

        case('userCount'):
          this.setState({numUsers: data.num})
          const newCurrUser = {
            name: this.state.currentUser.name,
            color: data.color
          }
          this.setState({currentUser: newCurrUser})
          break;
        default:
          const newMessage = data
          const oldMessages = this.state.messages;
          const updatedMessages = [...oldMessages, newMessage];

          this.setState({messages: updatedMessages})
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
