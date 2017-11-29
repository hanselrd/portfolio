import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Profile extends Component {
  render() {
    return (
      <div className="Profile">
        <Helmet>
          <title>Profile | Hansel De La Cruz</title>
        </Helmet>
        <p>Profile</p>
      </div>
    );
  }
}

export default Profile;
