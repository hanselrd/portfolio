import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Settings extends Component {
  render() {
    return (
      <div className="Settings">
        <Helmet>
          <title>Settings | Hansel De La Cruz</title>
        </Helmet>
        <p>Settings</p>
      </div>
    );
  }
}

export default Settings;
