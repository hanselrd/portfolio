import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
// import { changeName, changeAge } from '../actions/user';
import { increment, decrement, add } from '../actions/counter';
// import UserInfo from '../components/UserInfo';
import { bindActionName } from '../utils';

class App extends Component {
  render() {
    const {
      counter1,
      counter2,
      increment,
      increment1,
      increment2,
      decrement,
      decrement1,
      decrement2,
      add,
      add1,
      add2
    } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hansel De La Cruz</h1>
        </header>
        {/* <UserInfo user={user1} actions={{ changeName, changeAge }} />
        <UserInfo user={user2} actions={{ changeName, changeAge }} /> */}
        <p>Counter: {counter1.count}</p>
        <div>
          <button onClick={() => increment1()}>Increment</button>
          <button onClick={() => decrement1()}>Decrement</button>
          <button onClick={() => add1(5)}>Add 5</button>
        </div>
        <p>Counter: {counter2.count}</p>
        <div>
          <button onClick={() => increment2()}>Increment</button>
          <button onClick={() => decrement2()}>Decrement</button>
          <button onClick={() => add2(5)}>Add 5</button>
        </div>
        <hr />
        <div>
          <button onClick={() => increment()}>Increment All</button>
          <button onClick={() => decrement()}>Decrement All</button>
          <button onClick={() => add(5)}>Add 5 All</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // user1: state.user1,
    // user2: state.user2,
    counter1: state.counter1,
    counter2: state.counter2
  };
};

export default connect(mapStateToProps, {
  // changeName,
  // changeAge,
  increment,
  increment1: bindActionName(increment, 1),
  increment2: bindActionName(increment, 2),
  decrement,
  decrement1: bindActionName(decrement, 1),
  decrement2: bindActionName(decrement, 2),
  add,
  add1: bindActionName(add, 1),
  add2: bindActionName(add, 2)
})(App);
