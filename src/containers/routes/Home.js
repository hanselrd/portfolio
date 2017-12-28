import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import Page from '../../components/Page';
import Counter from '../../components/Counter';

class Home extends Component {
  render() {
    const { counter1, counter2, increment, decrement, add } = this.props;
    return (
      <div className="Home">
        <Page title="Home" subtitle="Independent counters stored in redux">
          <Counter
            counter={counter1}
            counterActions={{ increment, decrement, add }}
          />
          <Counter
            counter={counter2}
            counterActions={{ increment, decrement, add }}
          />
        </Page>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
