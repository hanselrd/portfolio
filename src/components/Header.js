import React, { Component } from 'react';
import { AppBar, FlatButton, IconMenu, MenuItem } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import PropTypes from 'prop-types';

class Auth extends Component {
  static muiName = 'FlatButton';

  render() {
    const { auth, actions } = this.props;
    return (
      <IconMenu
        iconButtonElement={
          <FlatButton
            {...this.props}
            labelPosition="before"
            labelStyle={{ textTransform: 'none' }}
            label={auth.user.displayName}
            icon={<MoreVertIcon />}
          />
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Help" />
        <MenuItem
          primaryText="Log out"
          disabled={auth.logout.loading}
          onClick={() => actions.logout()}
        />
      </IconMenu>
    );
  }
}

class Guest extends Component {
  static muiName = 'FlatButton';

  render() {
    const { auth, actions } = this.props;
    return (
      <div>
        <FlatButton
          {...this.props}
          label="Login"
          disabled={auth.login.loading}
          onClick={() => actions.login({ provider: 'google', type: 'popup' })}
        />
        <FlatButton {...this.props} label="Signup" />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    const { auth, actions } = this.props;
    return (
      <div className="Header">
        <AppBar
          title={<small>Hansel De La Cruz</small>}
          iconElementRight={
            auth.user ? (
              <Auth auth={auth} actions={actions} />
            ) : (
              <Guest auth={auth} actions={actions} />
            )
          }
        />
      </div>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Header;
