import React, { Component } from 'react';
import { Container, Dropdown, Icon, Menu, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              <span>Hansel De La Cruz</span>
            </Menu.Item>
            <Responsive as={Menu.Menu} position="right" minWidth={501}>
              <Menu.Item as="a" active>
                Home
              </Menu.Item>
              <Menu.Item as="a">Blog</Menu.Item>
              <Menu.Item as="a">Projects</Menu.Item>
              <Menu.Item as="a">CV</Menu.Item>
              <Dropdown item simple text="User">
                <Dropdown.Menu>
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
                  <Dropdown.Item active>Home</Dropdown.Item>
                  <Dropdown.Item>Blog</Dropdown.Item>
                  <Dropdown.Item>Projects</Dropdown.Item>
                  <Dropdown.Item>CV</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>User</Dropdown.Header>
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Log out</Dropdown.Item>
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
