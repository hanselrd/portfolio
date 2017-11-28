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
    selectedKeys: 'login'
  };

  handleMenuOnClick(item) {
    this.setState({
      selectedKeys: item.key
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
          className="Header-menu"
          selectedKeys={[this.state.selectedKeys]}
          onClick={item => {
            this.handleMenuOnClick(item);
          }}
        >
          {Object.keys(links).map(key => {
            return <Menu.Item key={key}>{links[key].name}</Menu.Item>;
          })}
        </Menu>
        <div className="Header-menu-mobile">
          <Dropdown
            overlay={
              <Menu
                selectedKeys={[this.state.selectedKeys]}
                onClick={item => {
                  this.handleMenuOnClick(item);
                }}
              >
                <Menu.ItemGroup title="Navigation">
                  {Object.keys(links).map(key => {
                    return (
                      <Menu.Item key={key} className="Header-menu-item-mobile">
                        {links[key].name}
                      </Menu.Item>
                    );
                  })}
                </Menu.ItemGroup>
                {auth && ( // should be auth.user
                  <Menu.ItemGroup title="User">
                    <Menu.Item
                      key="profile"
                      className="Header-menu-item-mobile"
                    >
                      Profile
                    </Menu.Item>
                    <Menu.Item
                      key="settings"
                      className="Header-menu-item-mobile"
                    >
                      Settings
                    </Menu.Item>
                    <Menu.Item key="logout" className="Header-menu-item-mobile">
                      Log out
                    </Menu.Item>
                  </Menu.ItemGroup>
                )}
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
        <div className="Header-menu-user">
          {auth && ( // should be auth.user
            <Dropdown
              overlay={
                <Menu onClick={item => this.handleUserOptions(item)}>
                  <Menu.Item key="profile">Profile</Menu.Item>
                  <Menu.Item key="settings">Settings</Menu.Item>
                  <Menu.Item key="logout">Log out</Menu.Item>
                </Menu>
              }
              placement="bottomRight"
              trigger={['click']}
            >
              <Button ghost size="large" style={{ border: 0 }}>
                User {/* {auth.user.displayName} */}
                <FontAwesome name="caret-down" />
              </Button>
            </Dropdown>
          )}
        </div>
      </Layout.Header>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired
};

export default Header;
