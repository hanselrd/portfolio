import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../utils';
import { Helmet } from 'react-helmet';
import { Layout, Menu, Card, Button, Dropdown } from 'antd';
import FontAwesome from 'react-fontawesome';

const menu = (
  <Menu style={{ width: 100 }} defaultSelectedKeys={['home']}>
    <Menu.Item key="home">Home</Menu.Item>
    <Menu.Item key="blog">Blog</Menu.Item>
    <Menu.Item key="projects">Projects</Menu.Item>
    <Menu.Item key="cv">CV</Menu.Item>
  </Menu>
);

class App extends Component {
  componentDidMount() {
    this.props.handleAuthStateChanged();
  }
  render() {
    const { auth } = this.props;
    const user = JSON.parse(JSON.stringify(auth.user));
    return (
      <div className="App">
        <Helmet>
          <title>App.js | Hansel De La Cruz</title>
        </Helmet>
        <Layout>
          <Layout.Header className="App-header">
            <span className="App-logo">Hansel De La Cruz</span>
            <span className="App-spacer" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['home']}
              className="App-menu"
            >
              <Menu.Item key={'home'}>Home</Menu.Item>
              <Menu.Item key={'blog'}>Blog</Menu.Item>
              <Menu.Item key={'projects'}>Projects</Menu.Item>
              <Menu.Item key={'cv'}>CV</Menu.Item>
            </Menu>
            <div className="App-menu-mobile">
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                trigger={['click']}
              >
                <Button ghost size="large" style={{ border: 0 }}>
                  <FontAwesome name="navicon" size="lg" />
                </Button>
              </Dropdown>
            </div>
          </Layout.Header>
          <Layout.Content className="App-content">
            <Card
              title={
                <h1>
                  <strong>App.js</strong>
                </h1>
              }
            >
              {auth.user &&
                Object.keys(user).map(key => {
                  return (
                    <div>
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
