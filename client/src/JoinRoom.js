import React from 'react';
import './App.css';
import Button from './Button';
import Chatroom from './Chatroom';

class JoinRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      props,
      activePage: 'enterCode',
      codeValue: '',
      roomID: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('validateJoin', (code) => {
      if (code !== false) {
        this.setState({ roomID: code }, () => {
          this.setState({ activePage: 'chatroom' });
        });
      } else {
        alert('Room ID is Invalid');
      }
    });
  }

  handleClick() {
    this.props.socket.emit('joinChatroom', this.state.codeValue);
  }

  handleChange(event) {
    this.setState({ codeValue: event.target.value });
  }

  render() {
    return (
      <div className='page-body'>
        {this.state.activePage === 'enterCode' ? (
          <div>
            <p>Join Room</p>
            <form>
              <label htmlFor='id'>Room Code</label>
              <input
                type='text'
                id='id'
                onChange={this.handleChange}
                value={this.state.codeValue}
              ></input>
            </form>

            <Button
              title='Join'
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

export default JoinRoom;
