import SetLanguageModal from '@app/components/SetLanguageModal';
import locale from '@app/core/locale';
import { RootState } from '@app/ducks';
import { authActions } from '@app/ducks/auth';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Container, Dropdown, Icon, Menu, Responsive } from 'semantic-ui-react';

type HeaderProps = ReturnType<typeof mapStateToProps> &
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
            <Dropdown.Header>{locale.language}</Dropdown.Header>
            <SetLanguageModal>
              <Dropdown.Item>
                {locale.getLanguage().toUpperCase()}
              </Dropdown.Item>
            </SetLanguageModal>
            <Dropdown.Header>{locale.navigation}</Dropdown.Header>
            <Dropdown.Item as={NavLink} to="/home">
              {locale.home}
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/blog">
              {locale.blog}
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/projects">
              {locale.projects}
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/cv">
              {locale.cv}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Responsive>
      <Responsive
        as={React.Fragment}
        minWidth={Responsive.onlyComputer.minWidth}
      >
        <SetLanguageModal>
          <Menu.Item>{locale.getLanguage().toUpperCase()}</Menu.Item>
        </SetLanguageModal>
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
          {locale.home}
        </Menu.Item>
        <Menu.Item as={NavLink} to="/blog">
          {locale.blog}
        </Menu.Item>
        <Menu.Item as={NavLink} to="/projects">
          {locale.projects}
        </Menu.Item>
        <Menu.Item as={NavLink} to="/cv">
          {locale.cv}
        </Menu.Item>
      </Responsive>
      <Menu.Menu position="right">
        <Responsive as={React.Fragment} {...Responsive.onlyMobile}>
          {!auth.user && (
            <Menu.Item as={NavLink} to="/login">
              {locale.logIn}
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
                  {locale.profile}
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/settings">
                  {locale.settings}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => authSignOut()}>
                  {locale.logOut}
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
                {locale.logIn}
              </Menu.Item>
              <Menu.Item as={NavLink} to="/signup">
                {locale.signUp}
              </Menu.Item>
            </React.Fragment>
          )}
          {auth.user &&
            users[auth.user.uid] && (
              <Dropdown item={true} text={users[auth.user.uid].displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/profile">
                    {locale.profile}
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/settings">
                    {locale.settings}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => authSignOut()}>
                    {locale.logOut}
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
