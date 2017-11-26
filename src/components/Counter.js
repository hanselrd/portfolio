import React, { Component } from 'react';
import '../styles/Counter.css';
import { RaisedButton } from 'material-ui';
import PropTypes from 'prop-types';

class Counter extends Component {
  render() {
    const { counter, actions } = this.props;
    return (
      <div className="Counter">
        <p>Counter: {counter.count}</p>
        <div>
          <RaisedButton
            label="increment"
            onClick={() => actions.increment(counter)}
          />
          <RaisedButton
            label="decrement"
            onClick={() => actions.decrement(counter)}
          />
          <RaisedButton label="add 5" onClick={() => actions.add(counter, 5)} />
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
