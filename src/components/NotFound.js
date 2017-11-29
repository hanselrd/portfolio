import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Icon, Message } from 'semantic-ui-react';

class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <Helmet>
          <title>Not Found | Hansel De La Cruz</title>
        </Helmet>
        <Message warning icon>
          <Icon name="exclamation circle" />
          <Message.Content>
            <Message.Header>This page does not exist</Message.Header>
            If one of the links on this website brought you here, remember this
            website is still under active development and may be broken or not
            exist yet.
          </Message.Content>
        </Message>
      </div>
    );
  }
}

export default NotFound;
