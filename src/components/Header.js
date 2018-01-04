import React, { Component } from 'react';
import { Container, Dropdown, Icon, Menu, Responsive } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import Aux from 'react-aux';
import PropTypes from 'prop-types';
import locales from '../locales';

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
                  <Dropdown.Header>{locales.header.navigation}</Dropdown.Header>
                  <Dropdown.Item as={NavLink} to="/home">
                    {locales.header.home}
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/blog">
                    {locales.header.blog}
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/projects">
                    {locales.header.projects}
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/cv">
                    {locales.header.cv}
                  </Dropdown.Item>
                  {auth.user && (
                    <Dropdown.Item as={NavLink} to="/game">
                      {locales.header.game}
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Responsive>
            <Menu.Item as={Link} to="/home" header>
              <Icon name="bookmark outline" size="big" color="blue" />
              Hansel De La Cruz
            </Menu.Item>
            <Responsive as={Aux} minWidth={Responsive.onlyComputer.minWidth}>
              <Menu.Item as={NavLink} to="/home">
                {locales.header.home}
              </Menu.Item>
              <Menu.Item as={NavLink} to="/blog">
                {locales.header.blog}
              </Menu.Item>
              <Menu.Item as={NavLink} to="/projects">
                {locales.header.projects}
              </Menu.Item>
              <Menu.Item as={NavLink} to="/cv">
                {locales.header.cv}
              </Menu.Item>
              {auth.user && (
                <Menu.Item as={NavLink} to="/game">
                  {locales.header.game}
                </Menu.Item>
              )}
            </Responsive>
            <Menu.Menu position="right">
              <Responsive as={Aux} {...Responsive.onlyMobile}>
                {!auth.user && (
                  <Menu.Item as={NavLink} to="/login">
                    {locales.header.logIn}
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
                        {locales.header.profile}
                      </Dropdown.Item>
                      <Dropdown.Item as={NavLink} to="/settings">
                        {locales.header.settings}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => authActions.logout()}>
                        {locales.header.logOut}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </Responsive>
              <Responsive as={Aux} minWidth={Responsive.onlyTablet.minWidth}>
                {!auth.user && (
                  <Aux>
                    <Menu.Item as={NavLink} to="/login">
                      {locales.header.logIn}
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/signup">
                      {locales.header.signUp}
                    </Menu.Item>
                  </Aux>
                )}
                {auth.user && (
                  <Dropdown item text={auth.user.displayName}>
                    <Dropdown.Menu>
                      <Dropdown.Item as={NavLink} to="/profile">
                        {locales.header.profile}
                      </Dropdown.Item>
                      <Dropdown.Item as={NavLink} to="/settings">
                        {locales.header.settings}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => authActions.logout()}>
                        {locales.header.logOut}
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
