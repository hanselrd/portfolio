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
        <Menu
          fixed="top"
          inverted
          style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.4)' }}
        >
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
                </Dropdown.Menu>
              </Dropdown>
            </Responsive>
            <Menu.Item as={Link} to="/home" header>
              <Icon name="bookmark outline" size="big" color="blue" />
              Hansel De La Cruz
            </Menu.Item>
            <Responsive as={Aux} minWidth={Responsive.onlyComputer.minWidth}>
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
            </Responsive>
            <Menu.Menu position="right">
              <Responsive as={Aux} {...Responsive.onlyMobile}>
                {!auth.user && (
                  <Menu.Item as={NavLink} to="/login">
                    Log in
                  </Menu.Item>
                )}
                {auth.user && (
                  <Dropdown
                    item
                    icon={<Icon name="user circle outline" size="large" />}
                  >
                    <Dropdown.Menu>
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
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </Responsive>
              <Responsive as={Aux} minWidth={Responsive.onlyTablet.minWidth}>
                {!auth.user && (
                  <Aux>
                    <Menu.Item as={NavLink} to="/login">
                      Log in
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/signup">
                      Sign up
                    </Menu.Item>
                  </Aux>
                )}
                {auth.user && (
                  <Dropdown item text={auth.user.displayName}>
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
              </Responsive>
            </Menu.Menu>
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
