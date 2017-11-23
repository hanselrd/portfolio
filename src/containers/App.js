import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils';
import Counter from '../components/Counter';

class App extends Component {
  render() {
    const { counter1, counter2, increment, decrement, add } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hansel De La Cruz</h1>
        </header>
        <Counter counter={counter1} actions={{ increment, decrement, add }} />
        <Counter counter={counter2} actions={{ increment, decrement, add }} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
