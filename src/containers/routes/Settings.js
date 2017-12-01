import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
