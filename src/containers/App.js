import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import * as userActions from '../actions/user';
import UserInfo from '../components/UserInfo';

class App extends Component {
  render() {
    const { user, dispatch } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hansel De La Cruz</h1>
        </header>
        <UserInfo user={user} dispatch={dispatch} actions={userActions} />
        <UserInfo user={user} dispatch={dispatch} actions={userActions} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(App);
