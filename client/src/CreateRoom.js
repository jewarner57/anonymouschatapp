import React from 'react';
import './App.css';
import Button from './Button';
import Chatroom from './Chatroom';

class CreateRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { props, activePage: 'enterSettings' };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.socket.emit('createNewChatroom', {
      password: '123',
      maxUsers: '99',
    });
  }

  componentDidMount() {
    this.props.socket.on('recieveChatroomCode', (code) => {
      this.setState({ roomID: code }, () => {
        this.setState({ activePage: 'chatroom' });
      });
    });
  }

  render() {
    return (
      <div className='page-body'>
        {this.state.activePage === 'enterSettings' ? (
          <div>
            <p>Create New Room</p>
            <form>
              <label htmlFor='pass'>Password</label>
              <input type='text' id='pass'></input>

              <label htmlFor='mau'>Max Allowed Users</label>
              <input type='text' id='mau'></input>
            </form>

            <Button
              title='Create'
              buttonClicked={this.handleClick}
              destination='chatroom'
            ></Button>
          </div>
        ) : this.state.activePage === 'chatroom' ? (
          <Chatroom
            socket={this.props.socket}
            title={this.state.roomID}
            onSend={'sendPrivateMessage'}
            roomID={this.state.roomID}
            onRecieve={'recieve' + this.state.roomID}
          ></Chatroom>
        ) : null}
      </div>
    );
  }
}

export default CreateRoom;
