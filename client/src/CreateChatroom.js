import React from 'react';
import './App.css';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { props };
  }

  render() {
    return (
      <div className='App-body'>
        <p>Create a no save chat</p>
      </div>
    );
  }
}

export default Chatroom;
