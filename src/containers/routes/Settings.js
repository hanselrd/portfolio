import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import Page from '../../components/Page';

class Settings extends Component {
  render() {
    return (
      <div className="Settings">
        <Page title="Settings">
          <p>Settings</p>
        </Page>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
