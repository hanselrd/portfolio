import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Page extends Component {
  render() {
    const { title, subtitle, hideHeader, children } = this.props;
    return (
      <div className="Page">
        <Helmet>
          <title>{title} | Hansel De La Cruz</title>
        </Helmet>
        {!hideHeader && (
          <Header as="h1">
            {title}
            {subtitle && <Header.Subheader>{subtitle}</Header.Subheader>}
          </Header>
        )}
        {children}
      </div>
    );
  }
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  hideHeader: PropTypes.bool
};

export default Page;
