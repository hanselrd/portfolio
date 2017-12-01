import React, { Component } from 'react';
import { Container, Dropdown, Icon, Menu, Responsive } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import Aux from 'react-aux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { auth, authActions } = this.props;
    return (
      <div className="Header">
        <Menu fixed="top" inverted>
          <Container>
            <Responsive as={Aux} maxWidth={Responsive.onlyTablet.maxWidth}>
              <Dropdown item icon={<Icon name="sidebar" size="large" />}>
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
                    <Dropdown.Item as={NavLink} to="/login">
                      Login
                    </Dropdown.Item>
                  )}
                  {auth.user && (
                    <Aux>
                      <Dropdown.Header>{auth.user.displayName}</Dropdown.Header>
                      <Dropdown.Item as={NavLink} to="/profile">
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item as={NavLink} to="/settings">
                        Settings
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => authActions.logout()}>
                        Log out
                      </Dropdown.Item>
                    </Aux>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Responsive>
            <Menu.Item as={Link} to="/home" header>
              <Icon name="bookmark outline" size="big" color="blue" />
              Hansel De La Cruz
            </Menu.Item>
            <Responsive as={Aux} minWidth={Responsive.onlyComputer.minWidth}>
              <Menu.Menu position="right">
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
                  <Menu.Item as={NavLink} to="/login">
                    Login
                  </Menu.Item>
                )}
                {auth.user && (
                  <Dropdown item simple text={auth.user.displayName}>
                    <Dropdown.Menu>
                      <Dropdown.Item as={NavLink} to="/profile">
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item as={NavLink} to="/settings">
                        Settings
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => authActions.logout()}>
                        Log out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </Menu.Menu>
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
