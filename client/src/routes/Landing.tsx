import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Segment } from 'semantic-ui-react';

const Landing: React.SFC = () => (
  <div>
    <Helmet>
      <title>Landing - Hansel De La Cruz</title>
    </Helmet>
    <Segment>
      <Container text={true}>Landing</Container>
    </Segment>
  </div>
);

export default Landing;
