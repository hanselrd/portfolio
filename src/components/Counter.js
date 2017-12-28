import React, { Component } from 'react';
import '../styles/Counter.css';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Counter extends Component {
  render() {
    const { counter, counterActions } = this.props;
    return (
      <div className="Counter">
        <p>Counter: {counter.count}</p>
        <Button onClick={() => counterActions.increment(counter)}>
          Increment
        </Button>
        <Button onClick={() => counterActions.decrement(counter)}>
          Decrement
        </Button>
        <Button onClick={() => counterActions.add(counter, 5)}>Add 5</Button>
      </div>
    );
  }
}

Counter.propTypes = {
  counter: PropTypes.object.isRequired,
  counterActions: PropTypes.object.isRequired
};

export default Counter;
