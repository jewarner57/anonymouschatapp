import React from 'react';
import './App.css';
import Button from './Button';

class CreateRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { props };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {}

  render() {
    return (
      <div className='page-body'>
        <p>Create New Room</p>
        <form>
          <label htmlFor='pass'>Password</label>
          <input type='text' id='pass'></input>

          <label htmlFor='mau'>Max Allowed Users</label>
          <input type='text' id='mau'></input>
        </form>

        <Button title='Create' buttonClicked={this.handleClick}></Button>
      </div>
    );
  }
}

export default CreateRoom;
