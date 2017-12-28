import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import Page from '../../components/Page';

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <Page title="Blog">
          <p>Blog</p>
        </Page>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
