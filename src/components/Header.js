import React, { Component } from 'react';
import '../styles/Header.css';
import { Layout, Menu, Button, Dropdown } from 'antd';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

const links = {
  // home: { name: 'Home', path: '' },
  // blog: { name: 'Blog', path: '' },
  // projects: { name: 'Projects', path: '' },
  // cv: { name: 'CV', path: '' },
  login: { name: 'Login', path: '' },
  signup: { name: 'Signup', path: '' }
};

class Header extends Component {
  state = {
    selectedKeys: ['login']
  };

  handleOnSelect(item) {
    console.log(item.keyPath);
    this.setState({
      selectedKeys: item.keyPath
    });
  }

  handleUserOptions(item) {
    const { authActions } = this.props;
    switch (item.key) {
      case 'logout':
        authActions.logout();
        break;
      default:
        break;
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <Layout.Header className="Header">
        <span className="Header-logo">Hansel De La Cruz</span>
        <span className="Header-spacer" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={this.state.selectedKeys}
          className="Header-menu"
          onSelect={item => this.handleOnSelect(item)}
        >
          {Object.keys(links).map(key => {
            return <Menu.Item key={key}>{links[key].name}</Menu.Item>;
          })}
        </Menu>
        <div className="Header-menu-mobile">
          <Dropdown
            overlay={
              <Menu
                defaultSelectedKeys={this.state.selectedKeys}
                style={{ width: 100 }}
                onClick={item => this.handleOnSelect(item)}
              >
                {Object.keys(links).map(key => {
                  return <Menu.Item key={key}>{links[key].name}</Menu.Item>;
                })}
              </Menu>
            }
            placement="bottomRight"
            trigger={['click']}
          >
            <Button ghost size="large" style={{ border: 0 }}>
              <FontAwesome name="navicon" size="lg" />
            </Button>
          </Dropdown>
        </div>
        {auth.user && (
          <Dropdown
            overlay={
              <Menu onClick={item => this.handleUserOptions(item)}>
                <Menu.Item key="logout">Log out</Menu.Item>
              </Menu>
            }
            placement="bottomRight"
            trigger={['click']}
          >
            <Button ghost size="large" style={{ border: 0 }}>
              {auth.user && auth.user.displayName}
            </Button>
          </Dropdown>
        )}
      </Layout.Header>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired
};

export default Header;
