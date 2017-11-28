import React, { Component } from 'react';
import '../styles/Counter.css';
import { Button } from 'antd';
import PropTypes from 'prop-types';

class Counter extends Component {
  render() {
    const { counter, actions } = this.props;
    return (
      <div className="Counter">
        <p>Counter: {counter.count}</p>
        <div>
          <Button type="primary" onClick={() => actions.increment(counter)}>
            Increment
          </Button>
          {/* <RaisedButton
            label="Decrement"
            primary
            style={style}
            onClick={() => actions.decrement(counter)}
          />
          <RaisedButton
            label="Add 5"
            primary
            style={style}
            onClick={() => actions.add(counter, 5)}
          /> */}
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
