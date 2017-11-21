import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import { changeName, changeAge } from '../actions/user';
import { counterUp, counterDown } from '../actions/counter';
import UserInfo from '../components/UserInfo';

class App extends Component {
  render() {
    const {
      user1,
      user2,
      changeName,
      changeAge,
      counter1,
      counter2,
      counterUp,
      counterDown
    } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hansel De La Cruz</h1>
        </header>
        <UserInfo user={user1} actions={{ changeName, changeAge }} />
        <UserInfo user={user2} actions={{ changeName, changeAge }} />
        <p>Counter: {counter1.count}</p>
        <div>
          <button onClick={() => counterUp(counter1)}>Increment</button>
          <button onClick={() => counterDown(counter1)}>Decrement</button>
        </div>
        <p>Counter: {counter2.count}</p>
        <div>
          <button onClick={() => counterUp(counter2)}>Increment</button>
          <button onClick={() => counterDown(counter2)}>Decrement</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user1: state.user1,
    user2: state.user2,
    counter1: state.counter1,
    counter2: state.counter2
  };
};

export default connect(mapStateToProps, {
  changeName,
  changeAge,
  counterUp,
  counterDown
})(App);
