import React, { Component } from 'react';
import '../styles/Header.css';
import { Container, Dropdown, Icon, Menu, Responsive } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import Aux from 'react-aux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { auth, authActions } = this.props;
    return (
      <div className="Header">
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              <span>Hansel De La Cruz</span>
            </Menu.Item>
            <Responsive as={Menu.Menu} position="right" minWidth={501}>
              <Menu.Item as={NavLink} to="/home">
                Home
              </Menu.Item>
              <Menu.Item as={NavLink} to="/blog">
                Blog
              </Menu.Item>
              <Menu.Item as={NavLink} to="/projects">
                Projects
              </Menu.Item>
              <Menu.Item as={NavLink} to="/cv">
                CV
              </Menu.Item>
              {!auth.user && (
                <Menu.Item
                  as="a"
                  onClick={() =>
                    authActions.login({ provider: 'google', type: 'popup' })
                  }
                >
                  Login
                </Menu.Item>
              )}
              {auth.user && (
                <Dropdown item simple text={auth.user.displayName}>
                  <Dropdown.Menu>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item onClick={() => authActions.logout()}>
                      Log out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Responsive>
            <Responsive as={Menu.Menu} position="right" maxWidth={500}>
              <Dropdown
                item
                icon={
                  <span>
                    <Icon name="sidebar" /> Menu
                  </span>
                }
              >
                <Dropdown.Menu>
                  <Dropdown.Header>Navigation</Dropdown.Header>
                  <Dropdown.Item as={NavLink} to="/home">
                    Home
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/blog">
                    Blog
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/projects">
                    Projects
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/cv">
                    CV
                  </Dropdown.Item>
                  {!auth.user && (
                    <Dropdown.Item
                      onClick={() =>
                        authActions.login({
                          provider: 'google',
                          type: 'popup'
                        })
                      }
                    >
                      Login
                    </Dropdown.Item>
                  )}
                  {auth.user && (
                    <Aux>
                      <Dropdown.Divider />
                      <Dropdown.Header>{auth.user.displayName}</Dropdown.Header>
                      <Dropdown.Item>Profile</Dropdown.Item>
                      <Dropdown.Item>Settings</Dropdown.Item>
                      <Dropdown.Item onClick={() => authActions.logout()}>
                        Log out
                      </Dropdown.Item>
                    </Aux>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Responsive>
          </Container>
        </Menu>
      </div>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired
};

export default Header;
