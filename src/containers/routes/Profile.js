import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import Page from '../../components/Page';

class Profile extends Component {
  render() {
    return (
      <div className="Profile">
        <Page title="Profile">
          <p>Profile</p>
        </Page>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
