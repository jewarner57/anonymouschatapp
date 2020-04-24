import React from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import './App.css';
import Welcome from './Welcome';
import Chatroom from './Chatroom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 'welcome',
      response: 0,
      endpoint: 'http://localhost:5000/',
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
          <h3 className='App-title'>
            No Know: Secure, Anonymous, No save, Chat
          </h3>
        </header>

        {this.state.activePage === 'create' ? (
          <CreateRoom></CreateRoom>
        ) : this.state.activePage === 'join' ? (
          <JoinRoom></JoinRoom>
        ) : this.state.activePage === 'welcome' ? (
          <div>
            <Welcome buttonClicked={this.handleClick.bind(this)}></Welcome>
            <div className='page-body'>
              <Chatroom
                title='Global Chat'
                endpoint={this.state.endpoint}
              ></Chatroom>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
