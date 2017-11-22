import React, { Component } from 'react';
import '../styles/Counter.css';
import PropTypes from 'prop-types';

class Counter extends Component {
  render() {
    const { counter, actions } = this.props;
    return (
      <div className="Counter">
        <p>Counter: {counter.count}</p>
        <div>
          <button onClick={() => actions.increment(counter)}>
            <span>Increment</span>
          </button>
          <button onClick={() => actions.decrement(counter)}>
            <span>Decrement</span>
          </button>
          <button onClick={() => actions.add(counter, 5)}>
            <span>Add 5</span>
          </button>
        </div>
      </div>
    );
  }
}

Counter.propTypes = {
  counter: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Counter;
