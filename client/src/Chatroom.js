import React from 'react';
import './App.css';
import Button from './Button';
import ToggleSwitch from './ToggleSwitch';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messageList: [] };
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSwitchFlip = this.handleSwitchFlip.bind(this);
  }

  sendMessage() {
    this.props.socket.emit(this.props.onSend, {
      roomID: this.props.roomID,
      body: this.state.messageValue,
    });

    let recievedMessageList = this.state.messageList;

    recievedMessageList.push({
      message: this.state.messageValue,
      type: 'outgoingMessage',
    });

    this.setState({ messageList: recievedMessageList, messageValue: '' });
  }

  componentDidMount() {
    let messageList = this.state.messageList;

    this.props.socket.on(this.props.onRecieve, (message) => {
      messageList.push({ message: message, type: 'incomingMessage' });
      this.updateMessageList(messageList);
    });
  }

  updateMessageList(newMessageList) {
    this.setState({ messageList: newMessageList });
  }

  handleSwitchFlip(event) {
    this.setState({ toggleSwitchValue: event.target.checked });
  }

  handleChange(event) {
    this.setState({ messageValue: event.target.value }, () => {
      let message = this.state.messageValue;
      let finalChar = message.substring(message.length - 1);

      if (
        (finalChar === '.' || finalChar === '?' || finalChar === '!') &&
        this.state.toggleSwitchValue === true
      ) {
        this.sendMessage();
      }
    });
  }

  render() {
    return (
      <div className='chatbox-body'>
        <h4 className='chatTitle'>Room ID: {this.props.title}</h4>
        <div className='message-list-container'>
          <div className='message-list'>
            {this.state.messageList.map((value, index) => {
              return (
                <p key={index} className={value.type}>
                  {value.message}
                </p>
              );
            })}
          </div>
        </div>
        <div className='text-form-container'>
          <textarea
            onChange={this.handleChange}
            value={this.state.messageValue}
            className='message'
            placeholder='Type stuff here'
          ></textarea>
          <div className='input-container'>
            <Button
              buttonClicked={this.sendMessage.bind(this)}
              destination='NA'
              title='Send'
            ></Button>
            <ToggleSwitch
              switchFlipped={this.handleSwitchFlip}
              title='Auto Send After: ". ? !"'
            ></ToggleSwitch>
          </div>
        </div>
      </div>
    );
  }
}

export default Chatroom;
