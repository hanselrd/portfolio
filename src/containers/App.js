import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import { changeName, changeAge } from '../actions/user';
import UserInfo from '../components/UserInfo';

class App extends Component {
  render() {
    const { user, changeName, changeAge } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hansel De La Cruz</h1>
        </header>
        <UserInfo user={user} actions={{ changeName, changeAge }} />
        <UserInfo user={user} actions={{ changeName, changeAge }} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, {
  changeName,
  changeAge
})(App);
