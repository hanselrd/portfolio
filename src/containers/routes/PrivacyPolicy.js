import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import { Helmet } from 'react-helmet';

class PrivacyPolicy extends Component {
  render() {
    return (
      <div className="PrivacyPolicy">
        <Helmet>
          <title>Privacy Policy | Hansel De La Cruz</title>
        </Helmet>
        <h1>Privacy Policy</h1>
        <p>
          <small>Last updated: November 10, 2017</small>
        </p>
        <p>
          By accessing or using the Hansel De La Cruz Web site, you agree to the
          terms of this Online Privacy Policy, as outlined below. If you do not
          agree to these terms, please do not access or use this site.
        </p>
        <h2>Collection of Personal Information</h2>
        <p>
          When you engage in certain activities on this site, you may be asked
          to provide certain information about yourself by filling out and
          submitting an online form. It is completely optional for you to engage
          in these activities. If you elect to engage in these activities,
          however, you may be required to provide personal information, such as
          your name, mailing address, e-mail address, and other personal
          identifying information.
        </p>
        <p>
          When you submit personal information, you understand and agree that
          Hansel De La Cruz may transfer, store, and process your information in
          any of the countries in which Hansel De La Cruz desires, including
          without limitation, the United States.
        </p>
        <p>
          Hansel De La Cruz collects this information in order to record and
          support your participation in the activities you select. Hansel De La
          Cruz also uses information that you provide as part of his effort to
          keep you informed about changes. Hansel De La Cruz will never sell or
          share your information with other companies.
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
