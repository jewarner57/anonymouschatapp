import React from 'react';
import './App.css';

class JoinRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { props };
  }

  render() {
    return (
      <div className='page-body'>
        <p>Join</p>
      </div>
    );
  }
}

export default JoinRoom;
