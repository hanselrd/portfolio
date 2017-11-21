import React, { Component } from 'react';
import '../styles/UserInfo.css';
import PropTypes from 'prop-types';

class UserInfo extends Component {
  render() {
    const { user, actions } = this.props;
    return (
      <div className="UserInfo">
        <p onClick={() => actions.changeName('Button')}>Name: {user.name}</p>
        <p onClick={() => actions.changeAge(99)}>Age: {user.age}</p>
      </div>
    );
  }
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default UserInfo;
