import React from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import './App.css';
import Welcome from './Welcome';
import Chatroom from './Chatroom';
import socket from './socketConfig';
import logo from './logo.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'welcome',
      response: 0,
      endpoint: 'http://localhost:5000/',
      socket: socket,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(page) {
    this.setState({ activePage: page });
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} alt='Logo' className='App-logo' />
          <h3 className='App-title'> No save, Anonymous Chat</h3>
        </header>
        {this.state.activePage === 'create' ? (
          <CreateRoom socket={this.state.socket}></CreateRoom>
        ) : this.state.activePage === 'join' ? (
          <JoinRoom socket={this.state.socket}></JoinRoom>
        ) : this.state.activePage === 'welcome' ? (
          <div>
            <Welcome buttonClicked={this.handleClick.bind(this)}></Welcome>
            <div className='page-body'>
              <Chatroom
                socket={this.state.socket}
                title='Global Chat'
                onSend='sendGlobalMessage'
                onRecieve='receiveGlobalMessage'
                roomID='Global'
              ></Chatroom>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
