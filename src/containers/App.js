import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils';
import UserInfo from '../components/UserInfo';

class App extends Component {
  render() {
    const {
      counter1,
      counter2,
      increment,
      decrement,
      add,
      user1,
      user2,
      changeName,
      changeAge
    } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hansel De La Cruz</h1>
        </header>
        <p>Counter: {counter1}</p>
        <div>
          <button onClick={() => increment(1)}>Increment</button>
          <button onClick={() => decrement(1)}>Decrement</button>
          <button onClick={() => add(1, 5)}>Add 5</button>
        </div>
        <p>Counter: {counter2}</p>
        <div>
          <button onClick={() => increment(2)}>Increment</button>
          <button onClick={() => decrement(2)}>Decrement</button>
          <button onClick={() => add(2, 5)}>Add 5</button>
        </div>
        <UserInfo user={user1} name={1} actions={{ changeName, changeAge }} />
        <UserInfo user={user2} name={2} actions={{ changeName, changeAge }} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
