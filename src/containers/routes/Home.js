import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import { Helmet } from 'react-helmet';
import { Header } from 'semantic-ui-react';
import Counter from '../../components/Counter';

class Home extends Component {
  render() {
    const { counter1, counter2, increment, decrement, add } = this.props;
    return (
      <div className="Home">
        <Helmet>
          <title>Home | Hansel De La Cruz</title>
        </Helmet>
        <Header as="h1">
          Home
          <Header.Subheader>
            Independent counters stored in redux
          </Header.Subheader>
        </Header>
        <Counter
          counter={counter1}
          counterActions={{ increment, decrement, add }}
        />
        <Counter
          counter={counter2}
          counterActions={{ increment, decrement, add }}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
