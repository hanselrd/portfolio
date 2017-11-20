import React, { Component } from 'react';
import '../styles/UserInfo.css';
import PropTypes from 'prop-types';

class UserInfo extends Component {
  render() {
    const { user, dispatch, actions } = this.props;
    return (
      <div className="UserInfo">
        <p onClick={() => dispatch(actions.changeName('Button'))}>
          Name: {user.name}
        </p>
        <p onClick={() => dispatch(actions.changeAge(99))}>Age: {user.age}</p>
      </div>
    );
  }
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

export default UserInfo;
