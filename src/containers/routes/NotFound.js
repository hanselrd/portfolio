import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import Page from '../../components/Page';
import { Icon, Message } from 'semantic-ui-react';

class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <Page title="Not Found" hideHeader>
          <Message warning icon>
            <Icon name="exclamation circle" />
            <Message.Content>
              <Message.Header>This page does not exist</Message.Header>
              If one of the links on this website brought you here, remember
              this website is still under active development and may be broken
              or not exist yet.
            </Message.Content>
          </Message>
        </Page>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
