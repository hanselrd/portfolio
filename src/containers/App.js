import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils';
import { Helmet } from 'react-helmet';
import { Layout, Card } from 'antd';
import Header from '../components/Header';
import Counter from '../components/Counter';

class App extends Component {
  componentDidMount() {
    this.props.handleAuthStateChanged();
  }

  render() {
    const {
      auth,
      login,
      logout,
      counter1,
      counter2,
      increment,
      decrement,
      add
    } = this.props;
    const user = JSON.parse(JSON.stringify(auth.user));
    return (
      <div className="App">
        <Helmet>
          <title>App.js | Hansel De La Cruz</title>
        </Helmet>
        <Layout>
          <Header auth={auth} authActions={{ login, logout }} />
          <Layout.Content className="App-content">
            <Card
              title={
                <h1>
                  <strong>App.js</strong>
                </h1>
              }
            >
              <Counter
                counter={counter1}
                counterActions={{ increment, decrement, add }}
              />
              <Counter
                counter={counter2}
                counterActions={{ increment, decrement, add }}
              />
              {auth.user &&
                Object.keys(user).map(key => {
                  return (
                    <div key={key}>
                      <h2>{key}</h2>
                      <p>{JSON.stringify(user[key])}</p>
                    </div>
                  );
                })}
            </Card>
          </Layout.Content>
          <Layout.Footer className="App-footer">
            <p>fb in github</p>
            <p>&copy; Copyright 2017 Hansel De La Cruz</p>
            <p>Privacy Policy Sitemap Contact</p>
          </Layout.Footer>
        </Layout>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
