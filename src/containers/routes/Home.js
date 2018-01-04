import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import Page from '../../components/Page';
import Counter from '../../components/Counter';
import { Transition } from 'react-transition-group';
import locales from '../../locales';

const duration = 600;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

class Home extends Component {
  render() {
    const { counter1, counter2, increment, decrement, add } = this.props;
    return (
      <div className="Home">
        <Page title={locales.home.title} subtitle={locales.home.subtitle}>
          <Transition appear in timeout={duration}>
            {state => (
              <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
                <Counter
                  counter={counter1}
                  counterActions={{ increment, decrement, add }}
                />
                <Counter
                  counter={counter2}
                  counterActions={{ increment, decrement, add }}
                />
              </div>
            )}
          </Transition>
        </Page>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
