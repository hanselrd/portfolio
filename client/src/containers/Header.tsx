import { RootState } from '@app/ducks';
import { authActions } from '@app/ducks/auth';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Container, Dropdown, Icon, Menu, Responsive } from 'semantic-ui-react';

export type HeaderProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const Header: React.SFC<HeaderProps> = ({ auth, authSignOut, users }) => (
  <Menu
    fixed="top"
    inverted={true}
    style={{ boxShadow: '0 3px 5px rgba(0, 0, 0, 0.4)', height: '4.5em' }}
  >
    <Container>
      <Responsive as={React.Fragment} maxWidth={Responsive.onlyTablet.maxWidth}>
        <Dropdown item={true} icon={<Icon name="sidebar" size="large" />}>
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
      <Menu.Item as={Link} to="/" header={true}>
        <Icon name="bookmark outline" size="big" color="blue" />
        Hansel De La Cruz
      </Menu.Item>
      <Responsive
        as={React.Fragment}
        minWidth={Responsive.onlyComputer.minWidth}
      >
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
        <Responsive as={React.Fragment} {...Responsive.onlyMobile}>
          {!auth.user && (
            <Menu.Item as={NavLink} to="/login">
              Log in
            </Menu.Item>
          )}
          {auth.user && (
            <Dropdown
              item={true}
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
                <Dropdown.Item onClick={() => authSignOut()}>
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Responsive>
        <Responsive
          as={React.Fragment}
          minWidth={Responsive.onlyTablet.minWidth}
        >
          {!auth.user && (
            <React.Fragment>
              <Menu.Item as={NavLink} to="/login">
                Log in
              </Menu.Item>
              <Menu.Item as={NavLink} to="/signup">
                Sign up
              </Menu.Item>
            </React.Fragment>
          )}
          {auth.user &&
            users[auth.user.uid] && (
              <Dropdown item={true} text={users[auth.user.uid].displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/profile">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/settings">
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => authSignOut()}>
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
        </Responsive>
      </Menu.Menu>
    </Container>
  </Menu>
);

const mapStateToProps = (state: RootState) => state;

const mapDispatchToProps = {
  authSignOut: authActions.signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
