import React, { Component } from 'react';
import '../styles/Counter.css';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import locales from '../locales';

class Counter extends Component {
  render() {
    const { counter, counterActions } = this.props;
    return (
      <div className="Counter">
        <p>{locales.formatString(locales.counter.counter, counter.count)}</p>
        <Button onClick={() => counterActions.increment(counter)}>
          {locales.counter.increment}
        </Button>
        <Button onClick={() => counterActions.decrement(counter)}>
          {locales.counter.decrement}
        </Button>
        <Button onClick={() => counterActions.add(counter, 5)}>
          {locales.formatString(locales.counter.add, 5)}
        </Button>
      </div>
    );
  }
}

Counter.propTypes = {
  counter: PropTypes.object.isRequired,
  counterActions: PropTypes.object.isRequired
};

export default Counter;
