import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

// let idIncrementor = 3;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      numUsers: 0,
    }

  }
  //
  addMessage(newMessage){
    this.socket.send(JSON.stringify(newMessage))
  }

  updateUser(newUser, newMessage){
    this.setState({currentUser: {name: newUser}})
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
          this.setState({numUsers: data.content})
          break;
        default:
          const newMessage = data
          const oldMessages = this.state.messages;
          const updatedMessages = [...oldMessages, newMessage];

          this.setState({messages: updatedMessages})
      }
    }



    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, type: 'postMessage', username: "Michelle", content: "Hello there!"};
    //   // const messages = this.state.messages.concat(newMessage)
    //   this.socket.send(JSON.stringify(newMessage))
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   // this.setState({messages: messages})
    //
    // }, 3000);
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className='onlineCount'>Users Online: {this.state.numUsers}</p>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar updateUser={this.updateUser.bind(this)} sendMessage={this.addMessage.bind(this)} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
