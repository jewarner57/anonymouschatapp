import React from 'react';
import { NavLink, Switch, Route, BrowserRouter } from 'react-router-dom';
import CreateChatroom from './CreateChatroom';
import JoinChatroom from './JoinChatroom';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };
  }

  callAPI() {
    fetch('http://localhost:9000/testAPI')
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <header className='App-header'>
            <h3 className='App-title'>
              No Know: Secure, Anonymous, No save, Chat
            </h3>
          </header>
          <div className='App-body'>
            <p className='App-intro'>{this.state.apiResponse}</p>

            <NavLink
              to='/NewChatroom'
              className='Button'
              activeClassName='selected'
            >
              Start a Chatroom
            </NavLink>

            <NavLink
              to='/JoinChatroom'
              className='Button'
              ctiveClassName='selected'
            >
              <div> Join Chatroom </div>
            </NavLink>
          </div>
        </div>

        <Switch>
          <Route path='/NewChatroom'>
            <CreateChatroom></CreateChatroom>
          </Route>
          <Route path='/JoinChatroom'>
            <JoinChatroom></JoinChatroom>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
