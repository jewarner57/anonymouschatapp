import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { props };
  }

  render() {
    return <div>Works</div>;
  }
}

export default Chatroom;
