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
      id: '',
      pass: '',
      roomID: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('validateJoin', (joinObj) => {
      if (joinObj.willJoin !== false) {
        this.setState({ roomID: joinObj.id }, () => {
          this.setState({ activePage: 'chatroom' });
        });
      } else {
        alert(joinObj.status);
      }
    });

    this.props.socket.on('joinError', (error) => {
      alert(error);
    });
  }

  handleClick() {
    this.props.socket.emit('joinChatroom', {
      id: this.state.id,
      password: this.state.pass,
    });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
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
                value={this.state.id}
              ></input>

              <label htmlFor='pass'>Password</label>
              <input
                type='text'
                id='pass'
                onChange={this.handleChange}
                value={this.state.pass}
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
