import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import { Helmet } from 'react-helmet';

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <Helmet>
          <title>Blog | Hansel De La Cruz</title>
        </Helmet>
        <p>Blog</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
