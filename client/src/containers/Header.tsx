import LanguageModal from '@app/containers/LanguageModal';
import strings from '@app/core/strings';
import { RootState } from '@app/ducks';
import { authActions } from '@app/ducks/auth';
import { localeActions } from '@app/ducks/locale';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Container, Dropdown, Icon, Menu, Responsive } from 'semantic-ui-react';

type HeaderProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const Header: React.SFC<HeaderProps> = ({
  auth,
  authSignOut,
  locale,
  localeShowModal,
  users
}) => (
  <Menu
    fixed="top"
    inverted={true}
    style={{ boxShadow: '0 3px 5px rgba(0, 0, 0, 0.4)', height: '5.5em' }}
  >
    <Container>
      <Responsive as={React.Fragment} maxWidth={Responsive.onlyTablet.maxWidth}>
        <Dropdown item={true} icon={<Icon name="sidebar" size="large" />}>
          <Dropdown.Menu>
            <Dropdown.Header>{strings.language}</Dropdown.Header>
            <LanguageModal>
              <Dropdown.Item onClick={() => localeShowModal()}>
                {locale.language && locale.language.toUpperCase()}
              </Dropdown.Item>
            </LanguageModal>
            <Dropdown.Header>{strings.navigation}</Dropdown.Header>
            <Dropdown.Item as={NavLink} to="/home">
              {strings.home}
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/blog">
              {strings.blog}
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/projects">
              {strings.projects}
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/cv">
              {strings.cv}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Responsive>
      <Responsive
        as={React.Fragment}
        minWidth={Responsive.onlyComputer.minWidth}
      >
        <LanguageModal>
          <Menu.Item onClick={() => localeShowModal()}>
            {locale.language && locale.language.toUpperCase()}
          </Menu.Item>
        </LanguageModal>
      </Responsive>
      <Menu.Item as={Link} to="/" header={true}>
        <Icon name="bookmark outline" size="big" color="blue" />
        <span style={{ fontSize: '1.1em' }}>Hansel De La Cruz</span>
      </Menu.Item>
      <Responsive
        as={React.Fragment}
        minWidth={Responsive.onlyComputer.minWidth}
      >
        <Menu.Item as={NavLink} to="/home">
          {strings.home}
        </Menu.Item>
        <Menu.Item as={NavLink} to="/blog">
          {strings.blog}
        </Menu.Item>
        <Menu.Item as={NavLink} to="/projects">
          {strings.projects}
        </Menu.Item>
        <Menu.Item as={NavLink} to="/cv">
          {strings.cv}
        </Menu.Item>
      </Responsive>
      <Menu.Menu position="right">
        <Responsive as={React.Fragment} {...Responsive.onlyMobile}>
          {!auth.user && (
            <Menu.Item as={NavLink} to="/login">
              {strings.logIn}
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
                  {strings.profile}
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/settings">
                  {strings.settings}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => authSignOut()}>
                  {strings.logOut}
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
                {strings.logIn}
              </Menu.Item>
              <Menu.Item as={NavLink} to="/signup">
                {strings.signUp}
              </Menu.Item>
            </React.Fragment>
          )}
          {auth.user &&
            users[auth.user.uid] && (
              <Dropdown item={true} text={users[auth.user.uid].displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/profile">
                    {strings.profile}
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/settings">
                    {strings.settings}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => authSignOut()}>
                    {strings.logOut}
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
  authSignOut: authActions.signOut,
  localeShowModal: localeActions.showModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
